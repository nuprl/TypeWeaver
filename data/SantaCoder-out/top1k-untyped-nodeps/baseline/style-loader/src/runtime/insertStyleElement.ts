/* istanbul ignore next  */
function insertStyleElement(options: StyleElementOptions) {
  const element = document.createElement("style");

  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);

  return element;
}

module.exports = insertStyleElement;