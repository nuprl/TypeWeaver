import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x11400, 0x1145B).addRange(0x1145D, 0x11461);
export const characters: string = set;
