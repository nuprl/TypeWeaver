import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x1F3FB, 0x1F3FF);
export const characters: string = set;
