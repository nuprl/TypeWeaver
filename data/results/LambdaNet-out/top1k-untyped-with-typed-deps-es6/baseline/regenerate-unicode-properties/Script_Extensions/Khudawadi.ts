import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x964, 0x965).addRange(0xA830, 0xA839).addRange(0x112B0, 0x112EA).addRange(0x112F0, 0x112F9);
export const characters: string = set;
