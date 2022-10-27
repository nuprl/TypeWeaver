import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x1E800, 0x1E8C4).addRange(0x1E8C7, 0x1E8D6);
export const characters: String = set;
