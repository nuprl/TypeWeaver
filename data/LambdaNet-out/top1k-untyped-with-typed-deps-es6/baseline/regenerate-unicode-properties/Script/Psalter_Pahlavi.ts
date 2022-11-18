import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x10B80, 0x10B91).addRange(0x10B99, 0x10B9C).addRange(0x10BA9, 0x10BAF);
export const characters: string = set;
