import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x1C00, 0x1C37).addRange(0x1C3B, 0x1C49).addRange(0x1C4D, 0x1C4F);
export const characters: string = set;
