import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x11700, 0x1171A).addRange(0x1171D, 0x1172B).addRange(0x11730, 0x11746);
export const characters = set;