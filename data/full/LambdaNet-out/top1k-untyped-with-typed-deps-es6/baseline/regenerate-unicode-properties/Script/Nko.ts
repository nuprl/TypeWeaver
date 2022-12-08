import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x7C0, 0x7FA).addRange(0x7FD, 0x7FF);
export const characters: string = set;
