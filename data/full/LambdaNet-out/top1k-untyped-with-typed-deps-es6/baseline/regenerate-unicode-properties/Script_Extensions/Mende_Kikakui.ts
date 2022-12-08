import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x1E800, 0x1E8C4).addRange(0x1E8C7, 0x1E8D6);
export const characters: string = set;
