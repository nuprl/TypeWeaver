import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0xD800, 0xDFFF);
export const characters = set;