/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement: Element,  attributes: string[]) {
  Object.keys(attributes).forEach((key) => {
    styleElement.setAttribute(key, attributes[key]);
  });
}

module.exports = setAttributesWithoutAttributes;