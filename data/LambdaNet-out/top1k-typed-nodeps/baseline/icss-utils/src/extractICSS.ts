const importPattern: RegExp = /^:import\(("[^"]*"|'[^']*'|[^"']+)\)$/;
const balancedQuotes: RegExp = /^("[^"]*"|'[^']*'|[^"']+)$/;

const getDeclsObject: Function = (rule: object) => {
  const object: object = {};

  rule.walkDecls((decl: object) => {
    const before: string = decl.raws.before ? decl.raws.before.trim() : "";

    object[before + decl.prop] = decl.value;
  });

  return object;
};
/**
 *
 * @param {string} css
 * @param {boolean} removeRules
 * @param {'auto' | 'rule' | 'at-rule'} mode
 */
const extractICSS: Function = (css: Function, removeRules: boolean = true, mode: number = "auto") => {
  const icssImports: object = {};
  const icssExports: string = {};

  function addImports(node: object, path: string): void {
    const unquoted: string = path.replace(/'|"/g, "");
    icssImports[unquoted] = Object.assign(
      icssImports[unquoted] || {},
      getDeclsObject(node)
    );

    if (removeRules) {
      node.remove();
    }
  }

  function addExports(node: object): void {
    Object.assign(icssExports, getDeclsObject(node));
    if (removeRules) {
      node.remove();
    }
  }

  css.each((node: object) => {
    if (node.type === "rule" && mode !== "at-rule") {
      if (node.selector.slice(0, 7) === ":import") {
        const matches: Promise = importPattern.exec(node.selector);

        if (matches) {
          addImports(node, matches[1]);
        }
      }

      if (node.selector === ":export") {
        addExports(node);
      }
    }

    if (node.type === "atrule" && mode !== "rule") {
      if (node.name === "icss-import") {
        const matches: Promise = balancedQuotes.exec(node.params);

        if (matches) {
          addImports(node, matches[1]);
        }
      }
      if (node.name === "icss-export") {
        addExports(node);
      }
    }
  });

  return { icssImports, icssExports };
};

module.exports = extractICSS;
