import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x900, 0x950).addRange(0x955, 0x963).addRange(0x966, 0x97F).addRange(0xA8E0, 0xA8FF);
export const characters: String = set;
