import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x2800, 0x28FF);
export const characters: String = set;
