import setFactory from 'regenerate';
const set: Object = setFactory();
set.addRange(0xAAE0, 0xAAF6).addRange(0xABC0, 0xABED).addRange(0xABF0, 0xABF9);
export const characters: String = set;
