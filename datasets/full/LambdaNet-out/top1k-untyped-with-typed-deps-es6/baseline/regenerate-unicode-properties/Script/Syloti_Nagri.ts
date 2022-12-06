import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0xA800, 0xA82C);
export const characters: string = set;
