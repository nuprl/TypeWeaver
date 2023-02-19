import REGEX from './regex.js';

function validate(uuid: string): boolean {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

export default validate;
