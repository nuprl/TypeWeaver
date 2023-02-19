"use strict";

export const removeLeadingAndTrailingHTTPWhitespace = string => {
  return string.replace(/^[ \t\n\r]+/u, "").replace(/[ \t\n\r]+$/u, "");
};

export const removeTrailingHTTPWhitespace = string => {
  return string.replace(/[ \t\n\r]+$/u, "");
};

export const isHTTPWhitespaceChar = char => {
  return char === " " || char === "\t" || char === "\n" || char === "\r";
};

export const solelyContainsHTTPTokenCodePoints = string => {
  return /^[-!#$%&'*+.^_`|~A-Za-z0-9]*$/u.test(string);
};

export const soleyContainsHTTPQuotedStringTokenCodePoints = string => {
  return /^[\t\u0020-\u007E\u0080-\u00FF]*$/u.test(string);
};

export const asciiLowercase = string => {
  return string.replace(/[A-Z]/ug, l => l.toLowerCase());
};

// This variant only implements it with the extract-value flag set.
export const collectAnHTTPQuotedString = (input, position) => {
  let value = "";

  position++;

  while (true) {
    while (position < input.length && input[position] !== "\"" && input[position] !== "\\") {
      value += input[position];
      ++position;
    }

    if (position >= input.length) {
      break;
    }

    const quoteOrBackslash = input[position];
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