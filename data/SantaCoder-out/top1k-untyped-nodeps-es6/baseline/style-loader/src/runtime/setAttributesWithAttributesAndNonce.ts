/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement: HTMLElement, attributes: any) {
  Object.keys(attributes).forEach((key) => {
    styleElement.setAttribute(key, attributes[key]);
  });
}

export default setAttributesWithoutAttributes;