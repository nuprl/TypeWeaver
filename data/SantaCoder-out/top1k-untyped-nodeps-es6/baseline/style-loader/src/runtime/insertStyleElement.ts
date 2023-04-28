/* istanbul ignore next  */
function insertStyleElement(options: StyleOptions) {
  const element = document.createElement("style");

  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);

  return element;
}

export default insertStyleElement;