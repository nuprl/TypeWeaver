/* istanbul ignore next  */
function insertStyleElement(options: object): object {
  const element: Error = document.createElement("style");

  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);

  return element;
}

export default insertStyleElement;
