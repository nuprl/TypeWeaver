import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x16AD0, 0x16AED).addRange(0x16AF0, 0x16AF5);
export const characters = set;