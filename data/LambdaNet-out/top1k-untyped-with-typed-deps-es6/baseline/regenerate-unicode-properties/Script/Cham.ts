import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0xAA00, 0xAA36).addRange(0xAA40, 0xAA4D).addRange(0xAA50, 0xAA59).addRange(0xAA5C, 0xAA5F);
export const characters: string = set;
