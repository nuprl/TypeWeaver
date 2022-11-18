/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement: Element, attributes: object): Void {
  Object.keys(attributes).forEach((key: string) => {
    styleElement.setAttribute(key, attributes[key]);
  });
}

module.exports = setAttributesWithoutAttributes;
