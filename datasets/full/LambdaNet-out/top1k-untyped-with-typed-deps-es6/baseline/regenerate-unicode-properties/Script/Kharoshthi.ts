import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x10A00, 0x10A03).addRange(0x10A05, 0x10A06).addRange(0x10A0C, 0x10A13).addRange(0x10A15, 0x10A17).addRange(0x10A19, 0x10A35).addRange(0x10A38, 0x10A3A).addRange(0x10A3F, 0x10A48).addRange(0x10A50, 0x10A58);
export const characters: string = set;
