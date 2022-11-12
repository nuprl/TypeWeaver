import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0xAA80, 0xAAC2).addRange(0xAADB, 0xAADF);
export const characters: String = set;
