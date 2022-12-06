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
  const browserBase: object = browserIframeDocument.createElement("base");
  browserIframeDocument.head.appendChild(browserBase);
  browserIframeDocument.body.appendChild(browserAnchor);

  const components: any[] = [
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

  function update(): void {
    const browserResult: any[] = getBrowserResult();
    const jsdomResult: Function = getJsdomResult();
    const mismatchedComponents: Function = getMismatchedComponents(browserResult, jsdomResult);

    setResult("browser", browserResult, mismatchedComponents);
    setResult("jsdom", jsdomResult, mismatchedComponents);
    updateFragmentForSharing();
  }

  function setResult(kind: string, result: any[], mismatchedComponents: Map): void {
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
        const componentEl: string = output.querySelector(`#${component}`).querySelector("td");
        setComponentElValue(componentEl, result[component]);
        setComponentElMismatch(componentEl, mismatchedComponents.has(component));
      }
    }
  }

  function setComponentElValue(componentEl: HTMLElement, value: string): void {
    // This shows up in Edge where username/password are undefined.
    const isNonString: boolean = typeof value !== "string";
    const isEmptyString: boolean = value === "";

    componentEl.textContent = isEmptyString ? "(empty string)" : value;
    componentEl.classList.toggle("empty-string", isEmptyString);
    componentEl.classList.toggle("non-string", isNonString);
  }

  function setComponentElMismatch(componentEl: HTMLElement, isMismatched: boolean): void {
    componentEl.classList.toggle("pass", !isMismatched);
    componentEl.classList.toggle("fail", isMismatched);
  }

  function getMismatchedComponents(result1: object, result2: object): object {
    const mismatched: Error = new Set();
    for (const component of components) {
      if (result1[component] !== result2[component]) {
        mismatched.add(component);
      }
    }
    return mismatched;
  }

  function getBrowserResult(): object {
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

  function setFromFragment(): void {
    const pieces: any[] = /#url=([^&]*)&base=(.*)/u.exec(location.hash);
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
  function encodeToBase64(originalString: string): number {
    const bytes: any[] = te.encode(originalString);
    const byteString: string = Array.from(bytes, (byte: string) => String.fromCharCode(byte)).join("");
    const encoded: string = btoa(byteString);
    return encoded;
  }

  function decodeFromBase64(encoded: string): any[] {
    const byteString: string = atob(encoded);
    const bytes: string = Uint8Array.from(byteString, (char: string) => char.charCodeAt(0));
    const originalString: string = td.decode(bytes);
    return originalString;
  }
})();
