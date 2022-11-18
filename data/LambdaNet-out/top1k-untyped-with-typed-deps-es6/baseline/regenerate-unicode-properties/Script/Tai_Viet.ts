import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0xAA80, 0xAAC2).addRange(0xAADB, 0xAADF);
export const characters: string = set;
