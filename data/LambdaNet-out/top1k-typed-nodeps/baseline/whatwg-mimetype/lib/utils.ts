"use strict";

exports.removeLeadingAndTrailingHTTPWhitespace = (string: String) => {
  return string.replace(/^[ \t\n\r]+/u, "").replace(/[ \t\n\r]+$/u, "");
};

exports.removeTrailingHTTPWhitespace = (string: String) => {
  return string.replace(/[ \t\n\r]+$/u, "");
};

exports.isHTTPWhitespaceChar = (char: Number) => {
  return char === " " || char === "\t" || char === "\n" || char === "\r";
};

exports.solelyContainsHTTPTokenCodePoints = (string: String) => {
  return /^[-!#$%&'*+.^_`|~A-Za-z0-9]*$/u.test(string);
};

exports.soleyContainsHTTPQuotedStringTokenCodePoints = (string: String) => {
  return /^[\t\u0020-\u007E\u0080-\u00FF]*$/u.test(string);
};

exports.asciiLowercase = (string: String) => {
  return string.replace(/[A-Z]/ug, (l: String) => l.toLowerCase());
};

// This variant only implements it with the extract-value flag set.
exports.collectAnHTTPQuotedString = (input: Array, position: Number) => {
  let value: String = "";

  position++;

  while (true) {
    while (position < input.length && input[position] !== "\"" && input[position] !== "\\") {
      value += input[position];
      ++position;
    }

    if (position >= input.length) {
      break;
    }

    const quoteOrBackslash: String = input[position];
    ++position;

    if (quoteOrBackslash === "\\") {
      if (position >= input.length) {
        value += "\\";
        break;
      }

      value += input[position];
      ++position;
    } else {
      break;
    }
  }

  return [value, position];
};
