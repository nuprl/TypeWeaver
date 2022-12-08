import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x16A0, 0x16EA).addRange(0x16EE, 0x16F8);
export const characters: string = set;
