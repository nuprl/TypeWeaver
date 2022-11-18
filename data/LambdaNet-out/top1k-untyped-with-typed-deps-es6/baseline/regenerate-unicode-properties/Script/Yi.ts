import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0xA000, 0xA48C).addRange(0xA490, 0xA4C6);
export const characters: string = set;
