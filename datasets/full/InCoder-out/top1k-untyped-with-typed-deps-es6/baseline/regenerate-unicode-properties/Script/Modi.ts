import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x11600, 0x11644).addRange(0x11650, 0x11659);
export const characters = set;