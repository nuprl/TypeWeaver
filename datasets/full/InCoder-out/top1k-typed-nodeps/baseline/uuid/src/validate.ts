import REGEX from './regex.js';

function validate(uuid: UUID) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

export default validate;