import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x10B40, 0x10B55).addRange(0x10B58, 0x10B5F);
export const characters = set;
