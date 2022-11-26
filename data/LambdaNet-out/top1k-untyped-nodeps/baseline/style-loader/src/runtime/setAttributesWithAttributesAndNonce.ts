/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement: Element, attributes: object): void {
  Object.keys(attributes).forEach((key: string) => {
    styleElement.setAttribute(key, attributes[key]);
  });
}

module.exports = setAttributesWithoutAttributes;
