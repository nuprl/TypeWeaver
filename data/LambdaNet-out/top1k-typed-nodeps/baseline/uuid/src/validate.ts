import REGEX from './regex.js';

function validate(uuid): Number {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

export default validate;
