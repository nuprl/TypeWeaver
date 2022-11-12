import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x1780, 0x17DD).addRange(0x17E0, 0x17E9).addRange(0x17F0, 0x17F9).addRange(0x19E0, 0x19FF);
export const characters: String = set;
