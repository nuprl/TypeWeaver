import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x10840, 0x10855).addRange(0x10857, 0x1085F);
export const characters: string = set;
