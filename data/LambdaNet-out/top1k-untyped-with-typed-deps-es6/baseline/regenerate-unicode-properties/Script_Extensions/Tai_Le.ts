import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x1040, 0x1049).addRange(0x1950, 0x196D).addRange(0x1970, 0x1974);
export const characters: String = set;
