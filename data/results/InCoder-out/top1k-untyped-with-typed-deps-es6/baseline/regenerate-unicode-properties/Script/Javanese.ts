import setFactory from 'regenerate';
const set = setFactory();
set.addRange(0xA980, 0xA9CD).addRange(0xA9D0, 0xA9D9).addRange(0xA9DE, 0xA9DF);
export const characters = set;