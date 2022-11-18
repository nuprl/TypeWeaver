import setFactory from 'regenerate';
const set: object = setFactory();
set.addRange(0x2FF0, 0x2FF1).addRange(0x2FF4, 0x2FFB);
export const characters: string = set;
