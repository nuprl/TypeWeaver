import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0xD800, 0xDFFF);
export const characters: String = set;
