"use strict";

exports.removeLeadingAndTrailingHTTPWhitespace = (string: string) => {
  return string.replace(/^[ \t\n\r]+/u, "").replace(/[ \t\n\r]+$/u, "");
};

exports.removeTrailingHTTPWhitespace = (string: string) => {
  return string.replace(/[ \t\n\r]+$/u, "");
};

exports.isHTTPWhitespaceChar = (char: number) => {
  return char === " " || char === "\t" || char === "\n" || char === "\r";
};

exports.solelyContainsHTTPTokenCodePoints = (string: string) => {
  return /^[-!#$%&'*+.^_`|~A-Za-z0-9]*$/u.test(string);
};

exports.soleyContainsHTTPQuotedStringTokenCodePoints = (string: string) => {
  return /^[\t\u0020-\u007E\u0080-\u00FF]*$/u.test(string);
};

exports.asciiLowercase = (string: string) => {
  return string.replace(/[A-Z]/ug, (l: string) => l.toLowerCase());
};

// This variant only implements it with the extract-value flag set.
exports.collectAnHTTPQuotedString = (input: any[], position: number) => {
  let value: string = "";

  position++;

  while (true) {
    while (position < input.length && input[position] !== "\"" && input[position] !== "\\") {
      value += input[position];
      ++position;
    }

    if (position >= input.length) {
      break;
    }

    const quoteOrBackslash: string = input[position];
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
