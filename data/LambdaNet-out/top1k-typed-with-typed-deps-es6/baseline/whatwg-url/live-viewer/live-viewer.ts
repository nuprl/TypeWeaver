"use strict";
(() => {
  const urlInput: Error = document.querySelector("#url");
  const baseInput: HTMLElement = document.querySelector("#base");

  const te: HTMLElement = new TextEncoder();
  const td: HTMLElement = new TextDecoder();

  // Use an iframe to avoid <base> affecting the main page. This is especially bad in Edge where it
  // appears to break Edge's DevTools.
  const browserIframeDocument: HTMLElement = document.querySelector("#browser-iframe").contentDocument;
  const browserAnchor: HTMLElement = browserIframeDocument.createElement("a");
  const browserBase: Object = browserIframeDocument.createElement("base");
  browserIframeDocument.head.appendChild(browserBase);
  browserIframeDocument.body.appendChild(browserAnchor);

  const components: Array = [
    "href",
    "protocol",
    "username",
    "password",
    "port",
    "hostname",
    "pathname",
    "search",
    "hash"
  ];

  urlInput.addEventListener("input", update);
  baseInput.addEventListener("input", update);
  window.addEventListener("hashchange", setFromFragment);
  setFromFragment();

  function update(): Void {
    const browserResult: Array = getBrowserResult();
    const jsdomResult: Function = getJsdomResult();
    const mismatchedComponents: Function = getMismatchedComponents(browserResult, jsdomResult);

    setResult("browser", browserResult, mismatchedComponents);
    setResult("jsdom", jsdomResult, mismatchedComponents);
    updateFragmentForSharing();
  }

  function setResult(kind: String, result: Array, mismatchedComponents: Map): Void {
    const output: EventTarget = document.querySelector(`#${kind}-output`);
    const error: Error = document.querySelector(`#${kind}-error`);

    if (result instanceof Error) {
      output.hidden = true;
      error.hidden = false;
      error.textContent = result.toString();
    } else {
      output.hidden = false;
      error.hidden = true;
      for (const component of components) {
        const componentEl: String = output.querySelector(`#${component}`).querySelector("td");
        setComponentElValue(componentEl, result[component]);
        setComponentElMismatch(componentEl, mismatchedComponents.has(component));
      }
    }
  }

  function setComponentElValue(componentEl: HTMLElement, value: String): Void {
    // This shows up in Edge where username/password are undefined.
    const isNonString: Boolean = typeof value !== "string";
    const isEmptyString: Boolean = value === "";

    componentEl.textContent = isEmptyString ? "(empty string)" : value;
    componentEl.classList.toggle("empty-string", isEmptyString);
    componentEl.classList.toggle("non-string", isNonString);
  }

  function setComponentElMismatch(componentEl: HTMLElement, isMismatched: Boolean): Void {
    componentEl.classList.toggle("pass", !isMismatched);
    componentEl.classList.toggle("fail", isMismatched);
  }

  function getMismatchedComponents(result1: Object, result2: Object): Object {
    const mismatched: Error = new Set();
    for (const component of components) {
      if (result1[component] !== result2[component]) {
        mismatched.add(component);
      }
    }
    return mismatched;
  }

  function getBrowserResult(): Object {
    // First make sure the base is not invalid by testing it against an about:blank base.
    browserBase.href = "about:blank";
    browserAnchor.href = baseInput.value;
    if (browserAnchor.protocol === ":") {
      return new Error("Browser could not parse the base URL");
    }

    // Now actually parse the URL against the base.
    browserAnchor.href = urlInput.value;
    browserBase.href = baseInput.value;
    if (browserAnchor.protocol === ":") {
      return new Error("Browser could not parse the input");
    }

    return browserAnchor;
  }

  function getJsdomResult(): Promise {
    try {
      return new whatwgURL.URL(urlInput.value, baseInput.value);
    } catch (e) {
      return e;
    }
  }

  function updateFragmentForSharing(): Promise {
    location.hash = `url=${encodeToBase64(urlInput.value)}&base=${encodeToBase64(baseInput.value)}`;
  }

  function setFromFragment(): Void {
    const pieces: Array = /#url=([^&]*)&base=(.*)/u.exec(location.hash);
    if (!pieces) {
      return;
    }
    const [, urlEncoded, baseEncoded] = pieces;
    try {
      urlInput.value = decodeFromBase64(urlEncoded);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("url hash parameter was not deserializable.");
    }

    try {
      baseInput.value = decodeFromBase64(baseEncoded);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn("base hash parameter was not deserializable.");
    }

    update();
  }

  // btoa / atob don't work on Unicode.
  // This version is a superset of btoa / atob, so it maintains compatibility with older versions of
  // the live viewer which used btoa / atob directly.
  function encodeToBase64(originalString: String): String {
    const bytes: Array = te.encode(originalString);
    const byteString: String = Array.from(bytes, (byte: String) => String.fromCharCode(byte)).join("");
    const encoded: String = btoa(byteString);
    return encoded;
  }

  function decodeFromBase64(encoded: String): Array {
    const byteString: String = atob(encoded);
    const bytes: String = Uint8Array.from(byteString, (char: String) => char.charCodeAt(0));
    const originalString: String = td.decode(bytes);
    return originalString;
  }
})();
