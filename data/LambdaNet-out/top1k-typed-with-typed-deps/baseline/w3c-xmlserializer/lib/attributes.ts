"use strict";

const xnv: Array = require("xml-name-validator");

const { NAMESPACES } = require("./constants");

function generatePrefix(map: Object, newNamespace: Number, prefixIndex: String): String {
  const generatedPrefix: String = `ns${prefixIndex}`;
  map[newNamespace] = [generatedPrefix];
  return generatedPrefix;
}

function preferredPrefixString(map: Object, ns: String, preferredPrefix: String): Array {
  const candidateList: Array = map[ns];
  if (!candidateList) {
    return null;
  }
  if (candidateList.includes(preferredPrefix)) {
    return preferredPrefix;
  }
  return candidateList[candidateList.length - 1];
}

function serializeAttributeValue(value: String/* , requireWellFormed*/): String {
  if (value === null) {
    return "";
  }
  // TODO: Check well-formedness
  return value
    .replace(/&/ug, "&amp;")
    .replace(/"/ug, "&quot;")
    .replace(/</ug, "&lt;")
    .replace(/>/ug, "&gt;")
    .replace(/\t/ug, "&#x9;")
    .replace(/\n/ug, "&#xA;")
    .replace(/\r/ug, "&#xD;");
}

function serializeAttributes(
  element: Element,
  map: Object,
  localPrefixes: Object,
  ignoreNamespaceDefAttr: Boolean,
  requireWellFormed: Boolean,
  refs: Element
): String {
  let result: String = "";
  const namespaceLocalnames: Object = Object.create(null);
  for (const attr of element.attributes) {
    if (
      requireWellFormed &&
      namespaceLocalnames[attr.namespaceURI] &&
      namespaceLocalnames[attr.namespaceURI].has(attr.localName)
    ) {
      throw new Error("Found duplicated attribute");
    }
    if (!namespaceLocalnames[attr.namespaceURI]) {
      namespaceLocalnames[attr.namespaceURI] = new Set();
    }
    namespaceLocalnames[attr.namespaceURI].add(attr.localName);
    const attributeNamespace: String = attr.namespaceURI;
    let candidatePrefix: String = null;
    if (attributeNamespace !== null) {
      candidatePrefix = preferredPrefixString(
        map,
        attributeNamespace,
        attr.prefix
      );
      if (attributeNamespace === NAMESPACES.XMLNS) {
        if (
          attr.value === NAMESPACES.XML ||
          (attr.prefix === null && ignoreNamespaceDefAttr) ||
          (attr.prefix !== null &&
            localPrefixes[attr.localName] !== attr.value &&
            map[attr.value].includes(attr.localName))
        ) {
          continue;
        }
        if (requireWellFormed && attr.value === NAMESPACES.XMLNS) {
          throw new Error(
            "The XMLNS namespace is reserved and cannot be applied as an element's namespace via XML parsing"
          );
        }
        if (requireWellFormed && attr.value === "") {
          throw new Error(
            "Namespace prefix declarations cannot be used to undeclare a namespace"
          );
        }
        if (attr.prefix === "xmlns") {
          candidatePrefix = "xmlns";
        }
      } else if (candidatePrefix === null) {
        candidatePrefix = generatePrefix(
          map,
          attributeNamespace,
          refs.prefixIndex++
        );
        result += ` xmlns:${candidatePrefix}="${serializeAttributeValue(
          attributeNamespace,
          requireWellFormed
        )}"`;
      }
    }

    result += " ";
    if (candidatePrefix !== null) {
      result += `${candidatePrefix}:`;
    }
    if (
      requireWellFormed &&
      (attr.localName.includes(":") ||
        !xnv.name(attr.localName) ||
        (attr.localName === "xmlns" && attributeNamespace === null))
    ) {
      throw new Error("Invalid attribute localName value");
    }
    result += `${attr.localName}="${serializeAttributeValue(attr.value, requireWellFormed)}"`;
  }
  return result;
}

module.exports.preferredPrefixString = preferredPrefixString;
module.exports.generatePrefix = generatePrefix;
module.exports.serializeAttributeValue = serializeAttributeValue;
module.exports.serializeAttributes = serializeAttributes;