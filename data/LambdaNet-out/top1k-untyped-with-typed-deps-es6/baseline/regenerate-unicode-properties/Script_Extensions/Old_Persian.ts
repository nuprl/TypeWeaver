import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x103A0, 0x103C3).addRange(0x103C8, 0x103D5);
export const characters: string = set;
