import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x13000, 0x1342E).addRange(0x13430, 0x13438);
export const characters: string = set;
