import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0xE01, 0xE3A).addRange(0xE40, 0xE5B);
export const characters = set;