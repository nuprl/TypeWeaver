/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement: Element, attributes: Object): Void {
  const nonce: Function =
    typeof __webpack_nonce__ !== "undefined" ? __webpack_nonce__ : null;

  if (nonce) {
    attributes.nonce = nonce;
  }

  Object.keys(attributes).forEach((key: String) => {
    styleElement.setAttribute(key, attributes[key]);
  });
}

export default setAttributesWithoutAttributes;
