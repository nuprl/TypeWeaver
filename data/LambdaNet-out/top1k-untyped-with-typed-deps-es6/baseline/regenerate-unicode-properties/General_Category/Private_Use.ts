import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0xE000, 0xF8FF).addRange(0xF0000, 0xFFFFD).addRange(0x100000, 0x10FFFD);
export const characters: string = set;
