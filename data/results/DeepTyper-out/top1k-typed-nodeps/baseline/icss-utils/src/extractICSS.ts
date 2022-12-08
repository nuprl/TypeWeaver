const importPattern: RegExp = /^:import\(("[^"]*"|'[^']*'|[^"']+)\)$/;
const balancedQuotes: RegExp = /^("[^"]*"|'[^']*'|[^"']+)$/;

const getDeclsObject: void = (rule: Rule) => {
  const object: {} = {};

  rule.walkDecls((decl: any) => {
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
const extractICSS: any = (css, removeRules = true, mode = "auto") => {
  const icssImports: {} = {};
  const icssExports: {} = {};

  function addImports(node: any, path: string): void {
    const unquoted: string = path.replace(/'|"/g, "");
    icssImports[unquoted] = Object.assign(
      icssImports[unquoted] || {},
      getDeclsObject(node)
    );

    if (removeRules) {
      node.remove();
    }
  }

  function addExports(node: any): void {
    Object.assign(icssExports, getDeclsObject(node));
    if (removeRules) {
      node.remove();
    }
  }

  css.each((node: any) => {
    if (node.type === "rule" && mode !== "at-rule") {
      if (node.selector.slice(0, 7) === ":import") {
        const matches: RegExpExecArray = importPattern.exec(node.selector);

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
        const matches: RegExpExecArray = balancedQuotes.exec(node.params);

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
