import path from "path";

import isEqualLocals from "./runtime/isEqualLocals";

const matchRelativePath: RegExp = /^\.\.?[/\\]/;

function isAbsolutePath(str: String): Boolean {
  return path.posix.isAbsolute(str) || path.win32.isAbsolute(str);
}

function isRelativePath(str: String): Boolean {
  return matchRelativePath.test(str);
}

// TODO simplify for the next major release
function stringifyRequest(loaderContext: HTMLElement, request: String): String {
  if (
    typeof loaderContext.utils !== "undefined" &&
    typeof loaderContext.utils.contextify === "function"
  ) {
    return JSON.stringify(
      loaderContext.utils.contextify(loaderContext.context, request)
    );
  }

  const splitted: Array = request.split("!");
  const { context } = loaderContext;

  return JSON.stringify(
    splitted
      .map((part: String) => {
        // First, separate singlePath from query, because the query might contain paths again
        const splittedPart: Object = part.match(/^(.*?)(\?.*)/);
        const query: String = splittedPart ? splittedPart[2] : "";
        let singlePath: String = splittedPart ? splittedPart[1] : part;

        if (isAbsolutePath(singlePath) && context) {
          singlePath = path.relative(context, singlePath);

          if (isAbsolutePath(singlePath)) {
            // If singlePath still matches an absolute path, singlePath was on a different drive than context.
            // In this case, we leave the path platform-specific without replacing any separators.
            // @see https://github.com/webpack/loader-utils/pull/14
            return singlePath + query;
          }

          if (isRelativePath(singlePath) === false) {
            // Ensure that the relative path starts at least with ./ otherwise it would be a request into the modules directory (like node_modules).
            singlePath = `./${singlePath}`;
          }
        }

        return singlePath.replace(/\\/g, "/") + query;
      })
      .join("!")
  );
}

function getImportLinkAPICode(esModule: Boolean, loaderContext: Number): Array {
  const modulePath: String = stringifyRequest(
    loaderContext,
    `!${path.join(__dirname, "runtime/injectStylesIntoLinkTag.js")}`
  );

  return esModule
    ? `import API from ${modulePath};`
    : `var API = require(${modulePath});`;
}

function getImportLinkContentCode(esModule: Boolean, loaderContext: Number, request: String): Array {
  const modulePath: String = stringifyRequest(loaderContext, `!!${request}`);

  return esModule
    ? `import content from ${modulePath};`
    : `var content = require(${modulePath});`;
}

function getImportStyleAPICode(esModule: Boolean, loaderContext: Number): Array {
  const modulePath: String = stringifyRequest(
    loaderContext,
    `!${path.join(__dirname, "runtime/injectStylesIntoStyleTag.js")}`
  );

  return esModule
    ? `import API from ${modulePath};`
    : `var API = require(${modulePath});`;
}

function getImportStyleDomAPICode(
  esModule: Boolean,
  loaderContext: String,
  isSingleton: Boolean,
  isAuto: Boolean
): Array {
  const styleAPI: String = stringifyRequest(
    loaderContext,
    `!${path.join(__dirname, "runtime/styleDomAPI.js")}`
  );
  const singletonAPI: String = stringifyRequest(
    loaderContext,
    `!${path.join(__dirname, "runtime/singletonStyleDomAPI.js")}`
  );

  if (isAuto) {
    return esModule
      ? `import domAPI from ${styleAPI};
        import domAPISingleton from ${singletonAPI};`
      : `var domAPI = require(${styleAPI});
        var domAPISingleton = require(${singletonAPI});`;
  }

  return esModule
    ? `import domAPI from ${isSingleton ? singletonAPI : styleAPI};`
    : `var domAPI = require(${isSingleton ? singletonAPI : styleAPI});`;
}

function getImportStyleContentCode(esModule: Boolean, loaderContext: Number, request: String): String {
  const modulePath: String = stringifyRequest(loaderContext, `!!${request}`);

  return esModule
    ? `import content, * as namedExport from ${modulePath};`
    : `var content = require(${modulePath});`;
}

function getImportInsertBySelectorCode(
  esModule: Boolean,
  loaderContext: Object,
  insertType: String,
  options: Object
): String {
  if (insertType === "selector") {
    const modulePath: String = stringifyRequest(
      loaderContext,
      `!${path.join(__dirname, "runtime/insertBySelector.js")}`
    );

    return esModule
      ? `import insertFn from ${modulePath};`
      : `var insertFn = require(${modulePath});`;
  }

  if (insertType === "module-path") {
    const modulePath: String = stringifyRequest(loaderContext, `${options.insert}`);

    loaderContext.addBuildDependency(options.insert);

    return esModule
      ? `import insertFn from ${modulePath};`
      : `var insertFn = require(${modulePath});`;
  }

  return "";
}

function getInsertOptionCode(insertType: String, options: Object): String {
  if (insertType === "selector") {
    const insert: String = options.insert ? JSON.stringify(options.insert) : '"head"';

    return `
      options.insert = insertFn.bind(null, ${insert});
    `;
  }

  if (insertType === "module-path") {
    return `options.insert = insertFn;`;
  }

  // Todo remove "function" type for insert option in next major release, because code duplication occurs. Leave require.resolve()
  return `options.insert = ${options.insert.toString()};`;
}

function getImportInsertStyleElementCode(esModule: Boolean, loaderContext: Number): Array {
  const modulePath: String = stringifyRequest(
    loaderContext,
    `!${path.join(__dirname, "runtime/insertStyleElement.js")}`
  );

  return esModule
    ? `import insertStyleElement from ${modulePath};`
    : `var insertStyleElement = require(${modulePath});`;
}

function getStyleHmrCode(esModule: Boolean, loaderContext: String, request: String, lazy: Boolean): String {
  const modulePath: String = stringifyRequest(loaderContext, `!!${request}`);

  return `
if (module.hot) {
  if (!content.locals || module.hot.invalidate) {
    var isEqualLocals = ${isEqualLocals.toString()};
    var isNamedExport = ${esModule ? "!content.locals" : false};
    var oldLocals = isNamedExport ? namedExport : content.locals;

    module.hot.accept(
      ${modulePath},
      function () {
        ${
          esModule
            ? `if (!isEqualLocals(oldLocals, isNamedExport ? namedExport : content.locals, isNamedExport)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = isNamedExport ? namedExport : content.locals;

              ${
                lazy
                  ? `if (update && refs > 0) {
                      update(content);
                    }`
                  : `update(content);`
              }`
            : `content = require(${modulePath});

              content = content.__esModule ? content.default : content;

              ${
                lazy
                  ? ""
                  : `if (typeof content === 'string') {
                      content = [[module.id, content, '']];
                    }`
              }

              if (!isEqualLocals(oldLocals, content.locals)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = content.locals;

              ${
                lazy
                  ? `if (update && refs > 0) {
                        update(content);
                      }`
                  : `update(content);`
              }`
        }
      }
    )
  }

  module.hot.dispose(function() {
    ${
      lazy
        ? `if (update) {
            update();
          }`
        : `update();`
    }
  });
}
`;
}

function getLinkHmrCode(esModule: Boolean, loaderContext: Number, request: String): String {
  const modulePath: String = stringifyRequest(loaderContext, `!!${request}`);

  return `
if (module.hot) {
  module.hot.accept(
    ${modulePath},
    function() {
     ${
       esModule
         ? "update(content);"
         : `content = require(${modulePath});

           content = content.__esModule ? content.default : content;

           update(content);`
     }
    }
  );

  module.hot.dispose(function() {
    update();
  });
}`;
}

function getdomAPI(isAuto: Boolean): String {
  return isAuto ? "isOldIE() ? domAPISingleton : domAPI" : "domAPI";
}

function getImportIsOldIECode(esModule: Boolean, loaderContext: Number): Array {
  const modulePath: String = stringifyRequest(
    loaderContext,
    `!${path.join(__dirname, "runtime/isOldIE.js")}`
  );

  return esModule
    ? `import isOldIE from ${modulePath};`
    : `var isOldIE = require(${modulePath});`;
}

function getStyleTagTransformFnCode(
  esModule: Boolean,
  loaderContext: Object,
  options: Object,
  isSingleton: Boolean,
  styleTagTransformType: Number
): String {
  if (isSingleton) {
    return "";
  }

  if (styleTagTransformType === "default") {
    const modulePath: String = stringifyRequest(
      loaderContext,
      `!${path.join(__dirname, "runtime/styleTagTransform.js")}`
    );

    return esModule
      ? `import styleTagTransformFn from ${modulePath};`
      : `var styleTagTransformFn = require(${modulePath});`;
  }

  if (styleTagTransformType === "module-path") {
    const modulePath: String = stringifyRequest(
      loaderContext,
      `${options.styleTagTransform}`
    );

    loaderContext.addBuildDependency(options.styleTagTransform);

    return esModule
      ? `import styleTagTransformFn from ${modulePath};`
      : `var styleTagTransformFn = require(${modulePath});`;
  }

  return "";
}

function getStyleTagTransformFn(options: Object, isSingleton: Boolean): Array {
  // Todo remove "function" type for styleTagTransform option in next major release, because code duplication occurs. Leave require.resolve()
  return isSingleton
    ? ""
    : typeof options.styleTagTransform === "function"
    ? `options.styleTagTransform = ${options.styleTagTransform.toString()}`
    : `options.styleTagTransform = styleTagTransformFn`;
}

function getExportStyleCode(esModule: Boolean, loaderContext: Number, request: String): String {
  const modulePath: String = stringifyRequest(loaderContext, `!!${request}`);

  return esModule
    ? `export * from ${modulePath};
       export default content && content.locals ? content.locals : undefined;`
    : "module.exports = content && content.locals || {};";
}

function getExportLazyStyleCode(esModule: Boolean, loaderContext: Number, request: String): String {
  const modulePath: String = stringifyRequest(loaderContext, `!!${request}`);

  return esModule
    ? `export * from ${modulePath};
       export default exported;`
    : "module.exports = exported;";
}

function getSetAttributesCode(esModule: Boolean, loaderContext: String, options: Object): String {
  let modulePath: String;

  if (typeof options.attributes !== "undefined") {
    modulePath =
      options.attributes.nonce !== "undefined"
        ? stringifyRequest(
            loaderContext,
            `!${path.join(
              __dirname,
              "runtime/setAttributesWithAttributesAndNonce.js"
            )}`
          )
        : stringifyRequest(
            loaderContext,
            `!${path.join(__dirname, "runtime/setAttributesWithAttributes.js")}`
          );
  } else {
    modulePath = stringifyRequest(
      loaderContext,
      `!${path.join(__dirname, "runtime/setAttributesWithoutAttributes.js")}`
    );
  }

  return esModule
    ? `import setAttributes from ${modulePath};`
    : `var setAttributes = require(${modulePath});`;
}

// eslint-disable-next-line import/prefer-default-export
export {
  stringifyRequest,
  getImportInsertStyleElementCode,
  getImportInsertBySelectorCode,
  getImportStyleContentCode,
  getImportStyleDomAPICode,
  getImportStyleAPICode,
  getImportLinkContentCode,
  getImportLinkAPICode,
  getStyleHmrCode,
  getLinkHmrCode,
  getdomAPI,
  getImportIsOldIECode,
  getStyleTagTransformFn,
  getExportStyleCode,
  getExportLazyStyleCode,
  getSetAttributesCode,
  getInsertOptionCode,
  getStyleTagTransformFnCode,
};
