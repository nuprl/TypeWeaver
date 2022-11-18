import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x11580, 0x115B5).addRange(0x115B8, 0x115DD);
export const characters: string = set;
