import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x10000, 0x1000B).addRange(0x1000D, 0x10026).addRange(0x10028, 0x1003A).addRange(0x1003C, 0x1003D).addRange(0x1003F, 0x1004D).addRange(0x10050, 0x1005D).addRange(0x10080, 0x100FA);
export const characters: String = set;