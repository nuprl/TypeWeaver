import setFactory from 'regenerate';
const set = setFactory(0x5F, 0x2054, 0xFF3F);
set.addRange(0x203F, 0x2040).addRange(0xFE33, 0xFE34).addRange(0xFE4D, 0xFE4F);
export const characters = set;
