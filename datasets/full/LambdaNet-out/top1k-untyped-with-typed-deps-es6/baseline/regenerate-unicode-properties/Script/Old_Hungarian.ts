import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x10C80, 0x10CB2).addRange(0x10CC0, 0x10CF2).addRange(0x10CFA, 0x10CFF);
export const characters: string = set;
