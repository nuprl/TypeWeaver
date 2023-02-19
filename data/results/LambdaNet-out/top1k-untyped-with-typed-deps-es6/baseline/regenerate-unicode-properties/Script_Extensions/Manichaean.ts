import setFactory from 'regenerate';
const set: object = setFactory(0x640);
set.addRange(0x10AC0, 0x10AE6).addRange(0x10AEB, 0x10AF6);
export const characters: string = set;
