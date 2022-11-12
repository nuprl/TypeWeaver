import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x1D800, 0x1DA8B).addRange(0x1DA9B, 0x1DA9F).addRange(0x1DAA1, 0x1DAAF);
export const characters: String = set;
