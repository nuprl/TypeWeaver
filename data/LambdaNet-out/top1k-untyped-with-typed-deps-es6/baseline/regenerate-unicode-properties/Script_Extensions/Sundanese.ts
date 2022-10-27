import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0x1B80, 0x1BBF).addRange(0x1CC0, 0x1CC7);
export const characters: String = set;
