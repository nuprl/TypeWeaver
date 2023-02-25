/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement: HTMLStyleElement, attributes: HTMLAttributes) {
  Object.keys(attributes).forEach((key) => {
    styleElement.setAttribute(key, attributes[key]);
  });
}

module.exports = setAttributesWithoutAttributes;