/* istanbul ignore next  */
const replaceText: void = (function replaceText(): any {
  const textStore: any[] = [];

  return function replace(index: number, replacement: string): any {
    textStore[index] = replacement;

    return textStore.filter(Boolean).join("\n");
  };
})();

/* istanbul ignore next  */
function apply(styleElement: any, index: number, remove: boolean, obj: any): void {
  let css: string;

  if (remove) {
    css = "";
  } else {
    css = "";

    if (obj.supports) {
      css += `@supports (${obj.supports}) {`;
    }

    if (obj.media) {
      css += `@media ${obj.media} {`;
    }

    const needLayer: boolean = typeof obj.layer !== "undefined";

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
  }

  // For old IE
  /* istanbul ignore if  */
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css);
  } else {
    const cssNode: any = document.createTextNode(css);
    const childNodes: NodeList = styleElement.childNodes;

    if (childNodes[index]) {
      styleElement.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index]);
    } else {
      styleElement.appendChild(cssNode);
    }
  }
}

const singletonData: any = {
  singleton: null,
  singletonCounter: 0,
};

/* istanbul ignore next  */
function domAPI(options: any): any {
  // eslint-disable-next-line no-undef,no-use-before-define
  const styleIndex: number = singletonData.singletonCounter++;
  const styleElement: HTMLStyleElement =
    // eslint-disable-next-line no-undef,no-use-before-define
    singletonData.singleton ||
    // eslint-disable-next-line no-undef,no-use-before-define
    (singletonData.singleton = options.insertStyleElement(options));

  return {
    update: (obj: any) => {
      apply(styleElement, styleIndex, false, obj);
    },
    remove: (obj: any) => {
      apply(styleElement, styleIndex, true, obj);
    },
  };
}

module.exports = domAPI;
