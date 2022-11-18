import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x110D0, 0x110E8).addRange(0x110F0, 0x110F9);
export const characters: string = set;
