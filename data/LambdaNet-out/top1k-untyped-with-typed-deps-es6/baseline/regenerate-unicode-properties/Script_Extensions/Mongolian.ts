import setFactory from 'regenerate';
const set: object = setFactory(0x202F);
set.addRange(0x1800, 0x1819).addRange(0x1820, 0x1878).addRange(0x1880, 0x18AA).addRange(0x11660, 0x1166C);
export const characters: string = set;
