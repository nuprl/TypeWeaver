/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement: Element, attributes: object): Void {
  const nonce: Function =
    typeof __webpack_nonce__ !== "undefined" ? __webpack_nonce__ : null;

  if (nonce) {
    attributes.nonce = nonce;
  }

  Object.keys(attributes).forEach((key: string) => {
    styleElement.setAttribute(key, attributes[key]);
  });
}

export default setAttributesWithoutAttributes;
