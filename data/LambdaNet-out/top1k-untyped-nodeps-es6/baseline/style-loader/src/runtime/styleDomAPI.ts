/* istanbul ignore next  */
function apply(styleElement: HTMLElement, options: Object, obj: Object): Void {
  let css: String = "";

  if (obj.supports) {
    css += `@supports (${obj.supports}) {`;
  }

  if (obj.media) {
    css += `@media ${obj.media} {`;
  }

  const needLayer: Boolean = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += `@layer${obj.layer.length > 0 ? ` ${obj.layer}` : ""} {`;
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  const sourceMap: Array = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += `\n/*# sourceMappingURL=data:application/json;base64,${btoa(
      unescape(encodeURIComponent(JSON.stringify(sourceMap)))
    )} */`;
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement: Element): Boolean {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options: Object): Object {
  const styleElement: Element = options.insertStyleElement(options);

  return {
    update: (obj: String) => {
      apply(styleElement, options, obj);
    },
    remove: () => {
      removeStyleElement(styleElement);
    },
  };
}

export default domAPI;
