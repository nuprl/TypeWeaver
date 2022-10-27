const memo: Object = {};

/* istanbul ignore next  */
function getTarget(target: Object): String {
  if (typeof memo[target] === "undefined") {
    let styleTarget: EventTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (
      window.HTMLIFrameElement &&
      styleTarget instanceof window.HTMLIFrameElement
    ) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert: String, style: String): Void {
  const target: Object = getTarget(insert);

  if (!target) {
    throw new Error(
      "Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid."
    );
  }

  target.appendChild(style);
}

export default insertBySelector;
