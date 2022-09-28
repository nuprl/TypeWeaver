/* istanbul ignore next  */
function insertStyleElement(options: any): string {
  const element: HTMLDivElement = document.createElement("style");

  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);

  return element;
}

module.exports = insertStyleElement;
