import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x1100, 0x11FF).addRange(0x302E, 0x302F).addRange(0x3131, 0x318E).addRange(0x3200, 0x321E).addRange(0x3260, 0x327E).addRange(0xA960, 0xA97C).addRange(0xAC00, 0xD7A3).addRange(0xD7B0, 0xD7C6).addRange(0xD7CB, 0xD7FB).addRange(0xFFA0, 0xFFBE).addRange(0xFFC2, 0xFFC7).addRange(0xFFCA, 0xFFCF).addRange(0xFFD2, 0xFFD7).addRange(0xFFDA, 0xFFDC);
export const characters: String = set;
