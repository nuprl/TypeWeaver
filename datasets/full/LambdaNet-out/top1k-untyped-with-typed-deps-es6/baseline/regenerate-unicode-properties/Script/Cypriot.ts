import setFactory from 'regenerate';
const set: object = setFactory(0x10808, 0x1083C, 0x1083F);
set.addRange(0x10800, 0x10805).addRange(0x1080A, 0x10835).addRange(0x10837, 0x10838);
export const characters: string = set;
