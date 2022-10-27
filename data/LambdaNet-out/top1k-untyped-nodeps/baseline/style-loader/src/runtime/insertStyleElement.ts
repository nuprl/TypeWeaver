/* istanbul ignore next  */
function insertStyleElement(options: Object): Object {
  const element: Error = document.createElement("style");

  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);

  return element;
}

module.exports = insertStyleElement;
