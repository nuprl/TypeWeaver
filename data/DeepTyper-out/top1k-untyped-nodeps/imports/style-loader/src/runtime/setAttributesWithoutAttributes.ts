/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement: string): string {
  const nonce: string =
    typeof __webpack_nonce__ !== "undefined" ? __webpack_nonce__ : null;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;
