import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0xA6A0, 0xA6F7).addRange(0x16800, 0x16A38);
export const characters: String = set;
