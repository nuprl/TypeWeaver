import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x2800, 0x28FF);
export const characters: string = set;
