import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x10B60, 0x10B72).addRange(0x10B78, 0x10B7F);
export const characters: string = set;
