import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x10480, 0x1049D).addRange(0x104A0, 0x104A9);
export const characters: string = set;
