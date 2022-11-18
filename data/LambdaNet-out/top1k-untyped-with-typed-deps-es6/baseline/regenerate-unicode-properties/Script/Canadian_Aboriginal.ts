import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x1400, 0x167F).addRange(0x18B0, 0x18F5).addRange(0x11AB0, 0x11ABF);
export const characters: string = set;
