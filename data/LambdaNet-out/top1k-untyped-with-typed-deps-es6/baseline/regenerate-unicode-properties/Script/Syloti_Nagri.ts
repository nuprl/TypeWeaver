import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0xA800, 0xA82C);
export const characters: String = set;
