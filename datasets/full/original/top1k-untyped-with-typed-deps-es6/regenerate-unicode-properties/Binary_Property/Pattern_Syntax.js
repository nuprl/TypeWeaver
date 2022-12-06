import setFactory from 'regenerate';
const set = setFactory(0x60, 0xA9, 0xAE, 0xB6, 0xBB, 0xBF, 0xD7, 0xF7, 0x3030);
set.addRange(0x21, 0x2F).addRange(0x3A, 0x40).addRange(0x5B, 0x5E).addRange(0x7B, 0x7E).addRange(0xA1, 0xA7).addRange(0xAB, 0xAC).addRange(0xB0, 0xB1).addRange(0x2010, 0x2027).addRange(0x2030, 0x203E).addRange(0x2041, 0x2053).addRange(0x2055, 0x205E).addRange(0x2190, 0x245F).addRange(0x2500, 0x2775).addRange(0x2794, 0x2BFF).addRange(0x2E00, 0x2E7F).addRange(0x3001, 0x3003).addRange(0x3008, 0x3020).addRange(0xFD3E, 0xFD3F).addRange(0xFE45, 0xFE46);
export const characters = set;
