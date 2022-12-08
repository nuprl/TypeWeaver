import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x10B00, 0x10B35).addRange(0x10B39, 0x10B3F);
export const characters = set;
