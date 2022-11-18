"use strict";
import { solelyContainsHTTPTokenCodePoints } from './utils.js';

export default (mimeType: MIMEType) => {
  let serialization: string = `${mimeType.type}/${mimeType.subtype}`;

  if (mimeType.parameters.size === 0) {
    return serialization;
  }

  for (let [name, value] of mimeType.parameters) {
    serialization += ";";
    serialization += name;
    serialization += "=";

    if (!solelyContainsHTTPTokenCodePoints(value) || value.length === 0) {
      value = value.replace(/(["\\])/ug, "\\$1");
      value = `"${value}"`;
    }

    serialization += value;
  }

  return serialization;
};
