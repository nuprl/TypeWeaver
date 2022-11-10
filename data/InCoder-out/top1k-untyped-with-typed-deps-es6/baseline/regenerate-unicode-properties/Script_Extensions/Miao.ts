import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x16F00, 0x16F4A).addRange(0x16F4F, 0x16F87).addRange(0x16F8F, 0x16F9F);
export const characters = set;