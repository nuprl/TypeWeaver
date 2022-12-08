import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x104B0, 0x104D3).addRange(0x104D8, 0x104FB);
export const characters = set;