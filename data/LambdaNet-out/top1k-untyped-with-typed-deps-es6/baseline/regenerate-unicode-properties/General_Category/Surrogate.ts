import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0xD800, 0xDFFF);
export const characters: string = set;
