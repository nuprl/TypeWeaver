/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement: HTMLStyleElement,  attributes: { nonce: string }) {
  const nonce =
    typeof __webpack_nonce__ !== "undefined" ? __webpack_nonce__ : null;

  if (nonce) {
    attributes.nonce = nonce;
  }

  Object.keys(attributes).forEach((key) => {
    styleElement.setAttribute(key, attributes[key]);
  });
}

export default setAttributesWithoutAttributes;