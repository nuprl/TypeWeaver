/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement: HTMLStyleElement, attributes: any) {
  Object.keys(attributes).forEach((key) => {
    styleElement.setAttribute(key, attributes[key]);
  });
}

module.exports = setAttributesWithoutAttributes;