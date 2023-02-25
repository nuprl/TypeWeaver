import setFactory from 'regenerate';

const set = setFactory(
  0xAB,
  0x2018,
  0x201F,
  0x2039,
  0x2E02,
  0x2E04,
  0x2E09,
  0x2E0C,
  0x2E1C,
  0x2E20
);

set.addRange(0x201B, 0x201C);
export const characters = set;