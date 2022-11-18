import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x964, 0x96F).addRange(0xA830, 0xA839).addRange(0x11800, 0x1183B);
export const characters: string = set;
