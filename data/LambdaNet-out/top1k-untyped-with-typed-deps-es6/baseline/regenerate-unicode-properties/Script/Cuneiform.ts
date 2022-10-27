import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x12000, 0x12399).addRange(0x12400, 0x1246E).addRange(0x12470, 0x12474).addRange(0x12480, 0x12543);
export const characters: String = set;
