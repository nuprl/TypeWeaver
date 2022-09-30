/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement: any, attributes: Object): void {
  Object.keys(attributes).forEach((key: string) => {
    styleElement.setAttribute(key, attributes[key]);
  });
}

module.exports = setAttributesWithoutAttributes;
