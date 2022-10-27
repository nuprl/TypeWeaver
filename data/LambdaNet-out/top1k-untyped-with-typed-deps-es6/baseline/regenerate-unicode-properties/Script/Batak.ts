import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x1BC0, 0x1BF3).addRange(0x1BFC, 0x1BFF);
export const characters: String = set;
