import setFactory from 'regenerate';
const set: Object = setFactory(0xFA11, 0xFA1F, 0xFA21);
set.addRange(0x3400, 0x4DBF).addRange(0x4E00, 0x9FFF).addRange(0xFA0E, 0xFA0F).addRange(0xFA13, 0xFA14).addRange(0xFA23, 0xFA24).addRange(0xFA27, 0xFA29).addRange(0x20000, 0x2A6DF).addRange(0x2A700, 0x2B738).addRange(0x2B740, 0x2B81D).addRange(0x2B820, 0x2CEA1).addRange(0x2CEB0, 0x2EBE0).addRange(0x30000, 0x3134A);
export const characters: String = set;
