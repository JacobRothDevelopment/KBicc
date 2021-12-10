const { longXor, bitAdd } = require('./functions');

const Ops = {
  0: (charAscii, inverter) => {
    return charAscii;
  },
  1: (charAscii, inverter) => {
    return bitAdd(charAscii, 1 * inverter);
  },
  2: (charAscii, inverter) => {
    return bitAdd(charAscii, 2 * inverter);
  },
  3: (charAscii, inverter) => {
    return bitAdd(charAscii, 3 * inverter);
  },
  4: (charAscii, inverter) => {
    return bitAdd(charAscii, 4 * inverter);
  },
  5: (charAscii, inverter) => {
    return bitAdd(charAscii, 5 * inverter);
  },
  6: (charAscii, inverter) => {
    return bitAdd(charAscii, 6 * inverter);
  },
  7: (charAscii, inverter) => {
    return bitAdd(charAscii, 7 * inverter);
  },
  8: (charAscii, inverter) => {
    return bitAdd(charAscii, 8 * inverter);
  },
  9: (charAscii, inverter) => {
    return bitAdd(charAscii, 9 * inverter);
  },
  A: (charAscii, inverter) => {
    return longXor(charAscii, '01011011');
  },
  B: (charAscii, inverter) => {
    return longXor(charAscii, '01100110');
  },
  C: (charAscii, inverter) => {
    return longXor(charAscii, '01001110');
  },
  D: (charAscii, inverter) => {
    return longXor(charAscii, '10000010');
  },
  E: (charAscii, inverter) => {
    return longXor(charAscii, '00011111');
  },
  F: (charAscii, inverter) => {
    return longXor(charAscii, '10110000');
  },
};

module.exports = { Ops };
