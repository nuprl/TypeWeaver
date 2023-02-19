const replaceValueSymbols: any = require("./replaceValueSymbols.js");

const replaceSymbols: void = (css: string, replacements: any) => {
  css.walk((node: any) => {
    if (node.type === "decl" && node.value) {
      node.value = replaceValueSymbols(node.value.toString(), replacements);
    } else if (node.type === "rule" && node.selector) {
      node.selector = replaceValueSymbols(
        node.selector.toString(),
        replacements
      );
    } else if (node.type === "atrule" && node.params) {
      node.params = replaceValueSymbols(node.params.toString(), replacements);
    }
  });
};

module.exports = replaceSymbols;
