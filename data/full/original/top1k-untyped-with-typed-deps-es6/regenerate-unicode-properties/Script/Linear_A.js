import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0x10600, 0x10736).addRange(0x10740, 0x10755).addRange(0x10760, 0x10767);
export const characters = set;
