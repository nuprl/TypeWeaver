module.exports = (url: String, options: Object) => {
  options = options || {};
  options.attributes =
    typeof options.attributes === "object" ? options.attributes : {};

  if (typeof options.attributes.nonce === "undefined") {
    const nonce: Function =
      typeof __webpack_nonce__ !== "undefined" ? __webpack_nonce__ : null;

    if (nonce) {
      options.attributes.nonce = nonce;
    }
  }

  const linkElement: HTMLElement = document.createElement("link");

  linkElement.rel = "stylesheet";
  linkElement.href = url;

  Object.keys(options.attributes).forEach((key: String) => {
    linkElement.setAttribute(key, options.attributes[key]);
  });

  options.insert(linkElement);

  return (newUrl: String) => {
    if (typeof newUrl === "string") {
      linkElement.href = newUrl;
    } else {
      linkElement.parentNode.removeChild(linkElement);
    }
  };
};
