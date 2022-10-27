import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x0, 0x1F).addRange(0x7F, 0x9F);
export const characters: String = set;
