/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement: Element): Void {
  const nonce: string =
    typeof __webpack_nonce__ !== "undefined" ? __webpack_nonce__ : null;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

export default setAttributesWithoutAttributes;
