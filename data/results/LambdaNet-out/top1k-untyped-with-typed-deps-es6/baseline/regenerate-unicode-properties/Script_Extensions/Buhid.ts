import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x1735, 0x1736).addRange(0x1740, 0x1753);
export const characters: string = set;
