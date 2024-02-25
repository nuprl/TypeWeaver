import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x1B00, 0x1B4C).addRange(0x1B50, 0x1B7E);
export const characters = set;
