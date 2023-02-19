import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x1760, 0x176C).addRange(0x176E, 0x1770).addRange(0x1772, 0x1773);
export const characters: string = set;
