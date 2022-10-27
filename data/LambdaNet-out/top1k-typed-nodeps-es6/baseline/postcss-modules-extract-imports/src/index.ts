import topologicalSort from './topologicalSort';

const matchImports: RegExp = /^(.+?)\s+from\s+(?:"([^"]+)"|'([^']+)'|(global))$/;
const icssImport: RegExp = /^:import\((?:"([^"]+)"|'([^']+)')\)/;

const VISITED_MARKER: Number = 1;

/**
 * :import('G') {}
 *
 * Rule
 *   composes: ... from 'A'
 *   composes: ... from 'B'

 * Rule
 *   composes: ... from 'A'
 *   composes: ... from 'A'
 *   composes: ... from 'C'
 *
 * Results in:
 *
 * graph: {
 *   G: [],
 *   A: [],
 *   B: ['A'],
 *   C: ['A'],
 * }
 */
function addImportToGraph(importId: String, parentId: Number, graph: Object, visited: Object): Void {
  const siblingsId: String = parentId + "_" + "siblings";
  const visitedId: String = parentId + "_" + importId;

  if (visited[visitedId] !== VISITED_MARKER) {
    if (!Array.isArray(visited[siblingsId])) {
      visited[siblingsId] = [];
    }

    const siblings: Array = visited[siblingsId];

    if (Array.isArray(graph[importId])) {
      graph[importId] = graph[importId].concat(siblings);
    } else {
      graph[importId] = siblings.slice();
    }

    visited[visitedId] = VISITED_MARKER;

    siblings.push(importId);
  }
}

export default (options: Object = {}) => {
  let importIndex: Number = 0;
  const createImportedName: String =
    typeof options.createImportedName !== "function"
      ? (importName: String /*, path*/) =>
          `i__imported_${importName.replace(/\W/g, "_")}_${importIndex++}`
      : options.createImportedName;
  const failOnWrongOrder: Function = options.failOnWrongOrder;

  return {
    postcssPlugin: "postcss-modules-extract-imports",
    prepare() {
      const graph = {};
      const visited = {};
      const existingImports = {};
      const importDecls = {};
      const imports = {};

      return {
        Once(root, postcss) {
          // Check the existing imports order and save refs
          root.walkRules((rule) => {
            const matches = icssImport.exec(rule.selector);

            if (matches) {
              const [, /*match*/ doubleQuotePath, singleQuotePath] = matches;
              const importPath = doubleQuotePath || singleQuotePath;

              addImportToGraph(importPath, "root", graph, visited);

              existingImports[importPath] = rule;
            }
          });

          root.walkDecls(/^composes$/, (declaration) => {
            const matches = declaration.value.match(matchImports);

            if (!matches) {
              return;
            }

            let tmpSymbols;
            let [
              ,
              /*match*/ symbols,
              doubleQuotePath,
              singleQuotePath,
              global,
            ] = matches;

            if (global) {
              // Composing globals simply means changing these classes to wrap them in global(name)
              tmpSymbols = symbols.split(/\s+/).map((s) => `global(${s})`);
            } else {
              const importPath = doubleQuotePath || singleQuotePath;

              let parent = declaration.parent;
              let parentIndexes = "";

              while (parent.type !== "root") {
                parentIndexes =
                  parent.parent.index(parent) + "_" + parentIndexes;
                parent = parent.parent;
              }

              const { selector } = declaration.parent;
              const parentRule = `_${parentIndexes}${selector}`;

              addImportToGraph(importPath, parentRule, graph, visited);

              importDecls[importPath] = declaration;
              imports[importPath] = imports[importPath] || {};

              tmpSymbols = symbols.split(/\s+/).map((s) => {
                if (!imports[importPath][s]) {
                  imports[importPath][s] = createImportedName(s, importPath);
                }

                return imports[importPath][s];
              });
            }

            declaration.value = tmpSymbols.join(" ");
          });

          const importsOrder = topologicalSort(graph, failOnWrongOrder);

          if (importsOrder instanceof Error) {
            const importPath = importsOrder.nodes.find((importPath) =>
              // eslint-disable-next-line no-prototype-builtins
              importDecls.hasOwnProperty(importPath)
            );
            const decl = importDecls[importPath];

            throw decl.error(
              "Failed to resolve order of composed modules " +
                importsOrder.nodes
                  .map((importPath) => "`" + importPath + "`")
                  .join(", ") +
                ".",
              {
                plugin: "postcss-modules-extract-imports",
                word: "composes",
              }
            );
          }

          let lastImportRule;

          importsOrder.forEach((path) => {
            const importedSymbols = imports[path];
            let rule = existingImports[path];

            if (!rule && importedSymbols) {
              rule = postcss.rule({
                selector: `:import("${path}")`,
                raws: { after: "\n" },
              });

              if (lastImportRule) {
                root.insertAfter(lastImportRule, rule);
              } else {
                root.prepend(rule);
              }
            }

            lastImportRule = rule;

            if (!importedSymbols) {
              return;
            }

            Object.keys(importedSymbols).forEach((importedSymbol) => {
              rule.append(
                postcss.decl({
                  value: importedSymbol,
                  prop: importedSymbols[importedSymbol],
                  raws: { before: "\n  " },
                })
              );
            });
          });
        },
      };
    },
  };
};

export const postcss: Boolean = true;
