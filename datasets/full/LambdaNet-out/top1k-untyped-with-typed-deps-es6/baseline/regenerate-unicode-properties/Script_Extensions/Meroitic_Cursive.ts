import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x109A0, 0x109B7).addRange(0x109BC, 0x109CF).addRange(0x109D2, 0x109FF);
export const characters: string = set;
