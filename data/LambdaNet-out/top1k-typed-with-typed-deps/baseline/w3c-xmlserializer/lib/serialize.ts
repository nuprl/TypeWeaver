"use strict";

const xnv: Array = require("xml-name-validator");

const attributeUtils: Array = require("./attributes");
const { NAMESPACES, VOID_ELEMENTS, NODE_TYPES } = require("./constants");

const XML_CHAR: RegExp = /^(\x09|\x0A|\x0D|[\x20-\uD7FF]|[\uE000-\uFFFD]|(?:[\uD800-\uDBFF][\uDC00-\uDFFF]))*$/u;
const PUBID_CHAR: RegExp = /^(\x20|\x0D|\x0A|[a-zA-Z0-9]|[-'()+,./:=?;!*#@$_%])*$/u;

function asciiCaseInsensitiveMatch(a: String, b: String): Boolean {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length; ++i) {
    if ((a.charCodeAt(i) | 32) !== (b.charCodeAt(i) | 32)) {
      return false;
    }
  }

  return true;
}

function recordNamespaceInformation(element: Element, map: Object, prefixMap: Object): String {
  let defaultNamespaceAttrValue: Array = null;
  for (let i = 0; i < element.attributes.length; ++i) {
    const attr: HTMLElement = element.attributes[i];
    if (attr.namespaceURI === NAMESPACES.XMLNS) {
      if (attr.prefix === null) {
        defaultNamespaceAttrValue = attr.value;
        continue;
      }
      let namespaceDefinition: String = attr.value;
      if (namespaceDefinition === NAMESPACES.XML) {
        continue;
      }
      // This is exactly the other way than the spec says, but that's intended.
      // All the maps coalesce null to the empty string (explained in the
      // spec), so instead of doing that every time, just do it once here.
      if (namespaceDefinition === null) {
        namespaceDefinition = "";
      }

      if (
        namespaceDefinition in map &&
        map[namespaceDefinition].includes(attr.localName)
      ) {
        continue;
      }
      if (!(namespaceDefinition in map)) {
        map[namespaceDefinition] = [];
      }
      map[namespaceDefinition].push(attr.localName);
      prefixMap[attr.localName] = namespaceDefinition;
    }
  }
  return defaultNamespaceAttrValue;
}

function serializeDocumentType(node: Object, namespace: String, prefixMap: String, requireWellFormed: Boolean): String {
  if (requireWellFormed && !PUBID_CHAR.test(node.publicId)) {
    throw new Error("Failed to serialize XML: document type node publicId is not well-formed.");
  }

  if (
    requireWellFormed &&
    (!XML_CHAR.test(node.systemId) ||
      (node.systemId.includes('"') && node.systemId.includes("'")))
  ) {
    throw new Error("Failed to serialize XML: document type node systemId is not well-formed.");
  }

  let markup: String = `<!DOCTYPE ${node.name}`;
  if (node.publicId !== "") {
    markup += ` PUBLIC "${node.publicId}"`;
  } else if (node.systemId !== "") {
    markup += " SYSTEM";
  }
  if (node.systemId !== "") {
    markup += ` "${node.systemId}"`;
  }
  return `${markup}>`;
}

function serializeProcessingInstruction(
  node: HTMLElement,
  namespace: String,
  prefixMap: String,
  requireWellFormed: Boolean
): String {
  if (
    requireWellFormed &&
    (node.target.includes(":") || asciiCaseInsensitiveMatch(node.target, "xml"))
  ) {
    throw new Error("Failed to serialize XML: processing instruction node target is not well-formed.");
  }
  if (
    requireWellFormed &&
    (!XML_CHAR.test(node.data) || node.data.includes("?>"))
  ) {
    throw new Error("Failed to serialize XML: processing instruction node data is not well-formed.");
  }
  return `<?${node.target} ${node.data}?>`;
}

function serializeDocument(
  node: Object,
  namespace: String,
  prefixMap: String,
  requireWellFormed: Boolean,
  refs: String
): String {
  if (requireWellFormed && node.documentElement === null) {
    throw new Error("Failed to serialize XML: document does not have a document element.");
  }
  let serializedDocument: String = "";
  for (const child of node.childNodes) {
    serializedDocument += xmlSerialization(
      child,
      namespace,
      prefixMap,
      requireWellFormed,
      refs
    );
  }
  return serializedDocument;
}

function serializeDocumentFragment(
  node: Object,
  namespace: String,
  prefixMap: String,
  requireWellFormed: Boolean,
  refs: String
): String {
  let markup: String = "";
  for (const child of node.childNodes) {
    markup += xmlSerialization(
      child,
      namespace,
      prefixMap,
      requireWellFormed,
      refs
    );
  }
  return markup;
}

function serializeText(node: Object, namespace: String, prefixMap: String, requireWellFormed: Boolean): String {
  if (requireWellFormed && !XML_CHAR.test(node.data)) {
    throw new Error("Failed to serialize XML: text node data is not well-formed.");
  }

  return node.data
    .replace(/&/ug, "&amp;")
    .replace(/</ug, "&lt;")
    .replace(/>/ug, "&gt;");
}

function serializeComment(node: Object, namespace: String, prefixMap: String, requireWellFormed: Boolean): String {
  if (requireWellFormed && !XML_CHAR.test(node.data)) {
    throw new Error("Failed to serialize XML: comment node data is not well-formed.");
  }

  if (
    requireWellFormed &&
    (node.data.includes("--") || node.data.endsWith("-"))
  ) {
    throw new Error("Failed to serialize XML: found hyphens in illegal places in comment node data.");
  }
  return `<!--${node.data}-->`;
}

function serializeElement(node: HTMLElement, namespace: String, prefixMap: String, requireWellFormed: Number, refs: HTMLElement): String {
  if (
    requireWellFormed &&
    (node.localName.includes(":") || !xnv.name(node.localName))
  ) {
    throw new Error("Failed to serialize XML: element node localName is not a valid XML name.");
  }
  let markup: String = "<";
  let qualifiedName: String = "";
  let skipEndTag: Boolean = false;
  let ignoreNamespaceDefinitionAttr: Boolean = false;
  const map: Object = { ...prefixMap };
  const localPrefixesMap: Object = Object.create(null);
  const localDefaultNamespace: Number = recordNamespaceInformation(
    node,
    map,
    localPrefixesMap
  );
  let inheritedNs: String = namespace;
  const ns: Number = node.namespaceURI;
  if (inheritedNs === ns) {
    if (localDefaultNamespace !== null) {
      ignoreNamespaceDefinitionAttr = true;
    }
    if (ns === NAMESPACES.XML) {
      qualifiedName = `xml:${node.localName}`;
    } else {
      qualifiedName = node.localName;
    }
    markup += qualifiedName;
  } else {
    let { prefix } = node;
    let candidatePrefix: String = attributeUtils.preferredPrefixString(map, ns, prefix);
    if (prefix === "xmlns") {
      if (requireWellFormed) {
        throw new Error("Failed to serialize XML: element nodes can't have a prefix of \"xmlns\".");
      }
      candidatePrefix = "xmlns";
    }
    if (candidatePrefix !== null) {
      qualifiedName = `${candidatePrefix}:${node.localName}`;
      if (
        localDefaultNamespace !== null &&
        localDefaultNamespace !== NAMESPACES.XML
      ) {
        inheritedNs =
          localDefaultNamespace === "" ? null : localDefaultNamespace;
      }
      markup += qualifiedName;
    } else if (prefix !== null) {
      if (prefix in localPrefixesMap) {
        prefix = attributeUtils.generatePrefix(map, ns, refs.prefixIndex++);
      }
      if (map[ns]) {
        map[ns].push(prefix);
      } else {
        map[ns] = [prefix];
      }
      qualifiedName = `${prefix}:${node.localName}`;
      markup += `${qualifiedName} xmlns:${prefix}="${attributeUtils.serializeAttributeValue(ns, requireWellFormed)}"`;
      if (localDefaultNamespace !== null) {
        inheritedNs =
          localDefaultNamespace === "" ? null : localDefaultNamespace;
      }
    } else if (localDefaultNamespace === null || localDefaultNamespace !== ns) {
      ignoreNamespaceDefinitionAttr = true;
      qualifiedName = node.localName;
      inheritedNs = ns;
      markup += `${qualifiedName} xmlns="${attributeUtils.serializeAttributeValue(ns, requireWellFormed)}"`;
    } else {
      qualifiedName = node.localName;
      inheritedNs = ns;
      markup += qualifiedName;
    }
  }

  markup += attributeUtils.serializeAttributes(
    node,
    map,
    localPrefixesMap,
    ignoreNamespaceDefinitionAttr,
    requireWellFormed,
    refs
  );

  if (
    ns === NAMESPACES.HTML &&
    node.childNodes.length === 0 &&
    VOID_ELEMENTS.has(node.localName)
  ) {
    markup += " /";
    skipEndTag = true;
  } else if (ns !== NAMESPACES.HTML && node.childNodes.length === 0) {
    markup += "/";
    skipEndTag = true;
  }
  markup += ">";
  if (skipEndTag) {
    return markup;
  }

  if (ns === NAMESPACES.HTML && node.localName === "template") {
    markup += xmlSerialization(
      node.content,
      inheritedNs,
      map,
      requireWellFormed,
      refs
    );
  } else {
    for (const child of node.childNodes) {
      markup += xmlSerialization(
        child,
        inheritedNs,
        map,
        requireWellFormed,
        refs
      );
    }
  }
  markup += `</${qualifiedName}>`;
  return markup;
}

function serializeCDATASection(node: Object): String {
  return `<![CDATA[${node.data}]]>`;
}

/**
 * @param {{prefixIndex: number}} refs
 */
function xmlSerialization(node: Object, namespace: String, prefixMap: String, requireWellFormed: Function, refs: String): String {
  switch (node.nodeType) {
    case NODE_TYPES.ELEMENT_NODE:
      return serializeElement(
        node,
        namespace,
        prefixMap,
        requireWellFormed,
        refs
      );
    case NODE_TYPES.DOCUMENT_NODE:
      return serializeDocument(
        node,
        namespace,
        prefixMap,
        requireWellFormed,
        refs
      );
    case NODE_TYPES.COMMENT_NODE:
      return serializeComment(node, namespace, prefixMap, requireWellFormed);
    case NODE_TYPES.TEXT_NODE:
      return serializeText(node, namespace, prefixMap, requireWellFormed);
    case NODE_TYPES.DOCUMENT_FRAGMENT_NODE:
      return serializeDocumentFragment(
        node,
        namespace,
        prefixMap,
        requireWellFormed,
        refs
      );
    case NODE_TYPES.DOCUMENT_TYPE_NODE:
      return serializeDocumentType(
        node,
        namespace,
        prefixMap,
        requireWellFormed
      );
    case NODE_TYPES.PROCESSING_INSTRUCTION_NODE:
      return serializeProcessingInstruction(
        node,
        namespace,
        prefixMap,
        requireWellFormed
      );
    case NODE_TYPES.ATTRIBUTE_NODE:
      return "";
    case NODE_TYPES.CDATA_SECTION_NODE:
      return serializeCDATASection(node);
    default:
      throw new TypeError("Failed to serialize XML: only Nodes can be serialized.");
  }
}

module.exports = (root: Function, { requireWellFormed = false } = {}) => {
  const namespacePrefixMap = Object.create(null);
  namespacePrefixMap["http://www.w3.org/XML/1998/namespace"] = ["xml"];
  return xmlSerialization(root, null, namespacePrefixMap, requireWellFormed, {
    prefixIndex: 1
  });
};
