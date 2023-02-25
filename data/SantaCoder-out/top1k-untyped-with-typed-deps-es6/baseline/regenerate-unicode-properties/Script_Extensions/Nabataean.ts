import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x10880, 0x1089E).addRange(0x108A7, 0x108AF);
export const characters = set;