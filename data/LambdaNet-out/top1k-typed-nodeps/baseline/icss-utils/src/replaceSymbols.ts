const replaceValueSymbols: Function = require("./replaceValueSymbols.js");

const replaceSymbols: Function = (css: Function, replacements: String) => {
  css.walk((node: Object) => {
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
