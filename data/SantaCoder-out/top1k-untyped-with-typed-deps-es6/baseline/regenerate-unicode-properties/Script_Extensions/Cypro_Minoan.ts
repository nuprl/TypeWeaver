import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x10100, 0x10101).addRange(0x12F90, 0x12FF2);
export const characters = set;