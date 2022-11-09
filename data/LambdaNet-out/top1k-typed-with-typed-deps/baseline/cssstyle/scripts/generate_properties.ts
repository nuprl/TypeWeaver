'use strict';

var fs: String = require('fs');
var path: String = require('path');
var babylon: String = require('babylon');
var t: HTMLElement = require('babel-types');
var generate: Function = require('babel-generator').default;
var traverse: Object = require('babel-traverse').default;
var resolve: Array = require('resolve');

var camelToDashed: Function = require('../lib/parsers').camelToDashed;

var basename: Function = path.basename;
var dirname: Array = path.dirname;

var uniqueIndex: Number = 0;
function getUniqueIndex(): Number {
  return uniqueIndex++;
}

var property_files: Array = fs
  .readdirSync(path.resolve(__dirname, '../lib/properties'))
  .filter(function(property: Array) {
    return property.substr(-3) === '.js';
  });
var out_file: String = fs.createWriteStream(path.resolve(__dirname, '../lib/properties.js'), {
  encoding: 'utf-8',
});
var date_today: HTMLInputElement = new Date();
out_file.write(
  "'use strict';\n\n// autogenerated - " +
    (date_today.getMonth() + 1 + '/' + date_today.getDate() + '/' + date_today.getFullYear()) +
    '\n\n'
);
out_file.write('/*\n *\n * https://www.w3.org/Style/CSS/all-properties.en.html\n */\n\n');

function isModuleDotExports(node: Object): Boolean {
  return (
    t.isMemberExpression(node, { computed: false }) &&
    t.isIdentifier(node.object, { name: 'module' }) &&
    t.isIdentifier(node.property, { name: 'exports' })
  );
}
function isRequire(node: HTMLElement, filename: String): Boolean {
  if (
    t.isCallExpression(node) &&
    t.isIdentifier(node.callee, { name: 'require' }) &&
    node.arguments.length === 1 &&
    t.isStringLiteral(node.arguments[0])
  ) {
    var relative: String = node.arguments[0].value;
    var fullPath: String = resolve.sync(relative, { basedir: dirname(filename) });
    return { relative: relative, fullPath: fullPath };
  } else {
    return false;
  }
}

// step 1: parse all files and figure out their dependencies
var parsedFilesByPath: Object = {};
property_files.map(function(property: String) {
  var filename: String = path.resolve(__dirname, '../lib/properties/' + property);
  var src: String = fs.readFileSync(filename, 'utf8');
  property = basename(property, '.js');
  var ast: Array = babylon.parse(src);
  var dependencies: Array = [];
  traverse(ast, {
    enter(path) {
      var r;
      if ((r = isRequire(path.node, filename))) {
        dependencies.push(r.fullPath);
      }
    },
  });
  parsedFilesByPath[filename] = {
    filename: filename,
    property: property,
    ast: ast,
    dependencies: dependencies,
  };
});

// step 2: serialize the files in an order where dependencies are always above
//         the files they depend on
var externalDependencies: Array = [];
var parsedFiles: Array = [];
var addedFiles: Object = {};
function addFile(filename: String, dependencyPath: String): Void {
  if (dependencyPath.indexOf(filename) !== -1) {
    throw new Error(
      'Circular dependency: ' +
        dependencyPath
          .slice(dependencyPath.indexOf(filename))
          .concat([filename])
          .join(' -> ')
    );
  }
  var file: Object = parsedFilesByPath[filename];
  if (addedFiles[filename]) {
    return;
  }
  if (!file) {
    externalDependencies.push(filename);
  } else {
    file.dependencies.forEach(function(dependency: String) {
      addFile(dependency, dependencyPath.concat([filename]));
    });
    parsedFiles.push(parsedFilesByPath[filename]);
  }
  addedFiles[filename] = true;
}
Object.keys(parsedFilesByPath).forEach(function(filename: String) {
  addFile(filename, []);
});
// Step 3: add files to output
// renaming exports to local variables `moduleName_export_exportName`
// and updating require calls as appropriate
var moduleExportsByPath: Function = {};
var statements: Array = [];
externalDependencies.forEach(function(filename: String, i: String) {
  var id: String = t.identifier(
    'external_dependency_' + basename(filename, '.js').replace(/[^A-Za-z]/g, '') + '_' + i
  );
  moduleExportsByPath[filename] = { defaultExports: id };
  var relativePath: String = path.relative(path.resolve(__dirname + '/../lib'), filename);
  if (relativePath[0] !== '.') {
    relativePath = './' + relativePath;
  }
  statements.push(
    t.variableDeclaration('var', [
      t.variableDeclarator(
        id,
        t.callExpression(t.identifier('require'), [t.stringLiteral(relativePath)])
      ),
    ])
  );
});
function getRequireValue(node: Object, file: Object): Promise {
  var r: Object, e: Object;
  // replace require("./foo").bar with the named export from foo
  if (
    t.isMemberExpression(node, { computed: false }) &&
    (r = isRequire(node.object, file.filename))
  ) {
    e = moduleExportsByPath[r.fullPath];
    if (!e) {
      return;
    }
    if (!e.namedExports) {
      return t.memberExpression(e.defaultExports, node.property);
    }
    if (!e.namedExports[node.property.name]) {
      throw new Error(r.relative + ' does not export ' + node.property.name);
    }
    return e.namedExports[node.property.name];

    // replace require("./foo") with the default export of foo
  } else if ((r = isRequire(node, file.filename))) {
    e = moduleExportsByPath[r.fullPath];
    if (!e) {
      if (/^\.\.\//.test(r.relative)) {
        node.arguments[0].value = r.relative.substr(1);
      }
      return;
    }
    return e.defaultExports;
  }
}
parsedFiles.forEach(function(file: Object) {
  var namedExports: Object = {};
  var localVariableMap: String = {};

  traverse(file.ast, {
    enter(path) {
      // replace require calls with the corresponding value
      var r;
      if ((r = getRequireValue(path.node, file))) {
        path.replaceWith(r);
        return;
      }

      // if we see `var foo = require('bar')` we can just inline the variable
      // representing `require('bar')` wherever `foo` was used.
      if (
        t.isVariableDeclaration(path.node) &&
        path.node.declarations.length === 1 &&
        t.isIdentifier(path.node.declarations[0].id) &&
        (r = getRequireValue(path.node.declarations[0].init, file))
      ) {
        var newName = 'compiled_local_variable_reference_' + getUniqueIndex();
        path.scope.rename(path.node.declarations[0].id.name, newName);
        localVariableMap[newName] = r;
        path.remove();
        return;
      }

      // rename all top level functions to keep them local to the module
      if (t.isFunctionDeclaration(path.node) && t.isProgram(path.parent)) {
        path.scope.rename(path.node.id.name, file.property + '_local_fn_' + path.node.id.name);
        return;
      }

      // rename all top level variables to keep them local to the module
      if (t.isVariableDeclaration(path.node) && t.isProgram(path.parent)) {
        path.node.declarations.forEach(function(declaration) {
          path.scope.rename(
            declaration.id.name,
            file.property + '_local_var_' + declaration.id.name
          );
        });
        return;
      }

      // replace module.exports.bar with a variable for the named export
      if (
        t.isMemberExpression(path.node, { computed: false }) &&
        isModuleDotExports(path.node.object)
      ) {
        var name = path.node.property.name;
        var identifier = t.identifier(file.property + '_export_' + name);
        path.replaceWith(identifier);
        namedExports[name] = identifier;
      }
    },
  });
  traverse(file.ast, {
    enter(path) {
      if (
        t.isIdentifier(path.node) &&
        Object.prototype.hasOwnProperty.call(localVariableMap, path.node.name)
      ) {
        path.replaceWith(localVariableMap[path.node.name]);
      }
    },
  });
  var defaultExports: Array = t.objectExpression(
    Object.keys(namedExports).map(function(name: String) {
      return t.objectProperty(t.identifier(name), namedExports[name]);
    })
  );
  moduleExportsByPath[file.filename] = {
    namedExports: namedExports,
    defaultExports: defaultExports,
  };
  statements.push(
    t.variableDeclaration(
      'var',
      Object.keys(namedExports).map(function(name: String) {
        return t.variableDeclarator(namedExports[name]);
      })
    )
  );
  statements.push.apply(statements, file.ast.program.body);
});
var propertyDefinitions: Array = [];
parsedFiles.forEach(function(file: Object) {
  var dashed: String = camelToDashed(file.property);
  propertyDefinitions.push(
    t.objectProperty(
      t.identifier(file.property),
      t.identifier(file.property + '_export_definition')
    )
  );
  if (file.property !== dashed) {
    propertyDefinitions.push(
      t.objectProperty(t.stringLiteral(dashed), t.identifier(file.property + '_export_definition'))
    );
  }
});
var definePropertiesCall: String = t.callExpression(
  t.memberExpression(t.identifier('Object'), t.identifier('defineProperties')),
  [t.identifier('prototype'), t.objectExpression(propertyDefinitions)]
);
statements.push(
  t.expressionStatement(
    t.assignmentExpression(
      '=',
      t.memberExpression(t.identifier('module'), t.identifier('exports')),
      t.functionExpression(
        null,
        [t.identifier('prototype')],
        t.blockStatement([t.expressionStatement(definePropertiesCall)])
      )
    )
  )
);
out_file.write(generate(t.program(statements)).code + '\n');
out_file.end(function(err: Boolean) {
  if (err) {
    throw err;
  }
});
