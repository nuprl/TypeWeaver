/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement: HTMLElement, attributes: any) {
  const nonce =
    typeof __webpack_nonce__ !== "undefined" ? __webpack_nonce__ : null;

  if (nonce) {
    attributes.nonce = nonce;
  }

  Object.keys(attributes).forEach((key) => {
    styleElement.setAttribute(key, attributes[key]);
  });
}

module.exports = setAttributesWithoutAttributes;