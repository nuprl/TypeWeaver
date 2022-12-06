import topologicalSort from './topologicalSort';

const matchImports: RegExp = /^(.+?)\s+from\s+(?:"([^"]+)"|'([^']+)'|(global))$/;
const icssImport: RegExp = /^:import\((?:"([^"]+)"|'([^']+)')\)/;

const VISITED_MARKER: number = 1;

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
function addImportToGraph(importId: string, parentId: string, graph: any, visited: any): void {
  const siblingsId: string = parentId + "_" + "siblings";
  const visitedId: string = parentId + "_" + importId;

  if (visited[visitedId] !== VISITED_MARKER) {
    if (!Array.isArray(visited[siblingsId])) {
      visited[siblingsId] = [];
    }

    const siblings: any = visited[siblingsId];

    if (Array.isArray(graph[importId])) {
      graph[importId] = graph[importId].concat(siblings);
    } else {
      graph[importId] = siblings.slice();
    }

    visited[visitedId] = VISITED_MARKER;

    siblings.push(importId);
  }
}

export default (options = {}) => {
  let importIndex: number = 0;
  const createImportedName: string =
    typeof options.createImportedName !== "function"
      ? (importName: string /*, path*/) =>
          `i__imported_${importName.replace(/\W/g, "_")}_${importIndex++}`
      : options.createImportedName;
  const failOnWrongOrder: any = options.failOnWrongOrder;

  return {
    postcssPlugin: "postcss-modules-extract-imports",
    prepare() {
      const graph: {} = {};
      const visited: {} = {};
      const existingImports: {} = {};
      const importDecls: {} = {};
      const imports: {} = {};

      return {
        Once(root, postcss) {
          // Check the existing imports order and save refs
          root.walkRules((rule: any) => {
            const matches: RegExpExecArray = icssImport.exec(rule.selector);

            if (matches) {
              const [, /*match*/ doubleQuotePath, singleQuotePath] = matches;
              const importPath: string = doubleQuotePath || singleQuotePath;

              addImportToGraph(importPath, "root", graph, visited);

              existingImports[importPath] = rule;
            }
          });

          root.walkDecls(/^composes$/, (declaration: any) => {
            const matches: any = declaration.value.match(matchImports);

            if (!matches) {
              return;
            }

            let tmpSymbols: any;
            let [
              ,
              /*match*/ symbols,
              doubleQuotePath,
              singleQuotePath,
              global,
            ] = matches;

            if (global) {
              // Composing globals simply means changing these classes to wrap them in global(name)
              tmpSymbols = symbols.split(/\s+/).map((s: string) => `global(${s})`);
            } else {
              const importPath: string = doubleQuotePath || singleQuotePath;

              let parent: any = declaration.parent;
              let parentIndexes: string = "";

              while (parent.type !== "root") {
                parentIndexes =
                  parent.parent.index(parent) + "_" + parentIndexes;
                parent = parent.parent;
              }

              const { selector } = declaration.parent;
              const parentRule: any = `_${parentIndexes}${selector}`;

              addImportToGraph(importPath, parentRule, graph, visited);

              importDecls[importPath] = declaration;
              imports[importPath] = imports[importPath] || {};

              tmpSymbols = symbols.split(/\s+/).map((s: string) => {
                if (!imports[importPath][s]) {
                  imports[importPath][s] = createImportedName(s, importPath);
                }

                return imports[importPath][s];
              });
            }

            declaration.value = tmpSymbols.join(" ");
          });

          const importsOrder: any = topologicalSort(graph, failOnWrongOrder);

          if (importsOrder instanceof Error) {
            const importPath: string = importsOrder.nodes.find((importPath: string) =>
              // eslint-disable-next-line no-prototype-builtins
              importDecls.hasOwnProperty(importPath)
            );
            const decl: any = importDecls[importPath];

            throw decl.error(
              "Failed to resolve order of composed modules " +
                importsOrder.nodes
                  .map((importPath: string) => "`" + importPath + "`")
                  .join(", ") +
                ".",
              {
                plugin: "postcss-modules-extract-imports",
                word: "composes",
              }
            );
          }

          let lastImportRule: any;

          importsOrder.forEach((path: string) => {
            const importedSymbols: any = imports[path];
            let rule: any = existingImports[path];

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

            Object.keys(importedSymbols).forEach((importedSymbol: string) => {
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

export const postcss: boolean = true;
