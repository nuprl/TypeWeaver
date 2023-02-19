import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0xA800, 0xA82C);
export const characters = set;