import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x11680, 0x116B9).addRange(0x116C0, 0x116C9);
export const characters: string = set;
