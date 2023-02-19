import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x1E100, 0x1E12C).addRange(0x1E130, 0x1E13D).addRange(0x1E140, 0x1E149).addRange(0x1E14E, 0x1E14F);
export const characters: string = set;
