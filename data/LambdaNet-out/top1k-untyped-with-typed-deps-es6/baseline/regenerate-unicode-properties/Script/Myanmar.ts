import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x1000, 0x109F).addRange(0xA9E0, 0xA9FE).addRange(0xAA60, 0xAA7F);
export const characters: String = set;
