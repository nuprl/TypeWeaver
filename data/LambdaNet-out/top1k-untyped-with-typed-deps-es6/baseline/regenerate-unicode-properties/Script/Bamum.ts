import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0xA6A0, 0xA6F7).addRange(0x16800, 0x16A38);
export const characters: string = set;
