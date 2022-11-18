import REGEX from './regex.js';

function validate(uuid): number {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

export default validate;
