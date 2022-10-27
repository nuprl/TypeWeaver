"use strict";

export const removeLeadingAndTrailingHTTPWhitespace: Function = (string: String) => {
  return string.replace(/^[ \t\n\r]+/u, "").replace(/[ \t\n\r]+$/u, "");
};

export const removeTrailingHTTPWhitespace: Function = (string: String) => {
  return string.replace(/[ \t\n\r]+$/u, "");
};

export const isHTTPWhitespaceChar: Function = (char: Number) => {
  return char === " " || char === "\t" || char === "\n" || char === "\r";
};

export const solelyContainsHTTPTokenCodePoints: Function = (string: String) => {
  return /^[-!#$%&'*+.^_`|~A-Za-z0-9]*$/u.test(string);
};

export const soleyContainsHTTPQuotedStringTokenCodePoints: Function = (string: String) => {
  return /^[\t\u0020-\u007E\u0080-\u00FF]*$/u.test(string);
};

export const asciiLowercase: Function = (string: String) => {
  return string.replace(/[A-Z]/ug, (l: String) => l.toLowerCase());
};

// This variant only implements it with the extract-value flag set.
export const collectAnHTTPQuotedString: Function = (input: Array, position: Number) => {
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
