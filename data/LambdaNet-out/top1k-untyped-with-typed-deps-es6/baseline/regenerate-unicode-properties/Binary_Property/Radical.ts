import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x2E80, 0x2E99).addRange(0x2E9B, 0x2EF3).addRange(0x2F00, 0x2FD5);
export const characters: string = set;
