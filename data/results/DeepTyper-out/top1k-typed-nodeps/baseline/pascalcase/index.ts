import camelcase from 'camelcase';

const PUNCTUATION: RegExp = /[^\p{L}\p{N}]+/ug;

const toString: string = (input: string) => {
  if (input == null) return '';

  if (Array.isArray(input)) {
    return input.map((s: any) => s.toString().trim()).filter((s: any) => s.length > 0).join(' ');
  }

  if (typeof input === 'function') {
    return input.name ? input.name : '';
  }

  if (typeof input.toString !== 'function') {
    return '';
  }

  return input.toString().trim();
};

export const pascalcase: string = (value, options = {}) => {
  const input: string = toString(value);
  const regex: RegExp = options.punctuationRegex ?? PUNCTUATION;
  const output: string = input ? camelcase(regex ? input.replace(regex, ' ') : input, options) : '';
  return output ? output[0].toLocaleUpperCase(options.locale) + output.slice(1) : '';
};

export default pascalcase;
