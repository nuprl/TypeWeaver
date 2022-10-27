/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement: Element, attributes: Object): Void {
  Object.keys(attributes).forEach((key: String) => {
    styleElement.setAttribute(key, attributes[key]);
  });
}

module.exports = setAttributesWithoutAttributes;
