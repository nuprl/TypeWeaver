import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x11100, 0x11134).addRange(0x11136, 0x11147);
export const characters: String = set;