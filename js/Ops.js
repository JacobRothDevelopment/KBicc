const {
  longXor,
  bitAdd,
  shuffleStr,
  unShuffleStr,
  bitwiseXor,
} = require('./functions');
const { _numBits, _xorNums } = require('./settings');

/*
inputObj = {
  inBins: string,
  doInvert: bool,
  inputIndexOffset: int,
  outBins: string[],
}
*/

var Ops1 = {
  0: (inputObj) => {
    inputObj.outBins = [inputObj.inBins];
  },
  1: (inputObj) => {
    inputObj.outBins = [bitAdd(inputObj.inBins, 2, inputObj.doInvert)];
  },
  2: (inputObj) => {
    inputObj.outBins = [bitAdd(inputObj.inBins, 3, inputObj.doInvert)];
  },
  3: (inputObj) => {
    inputObj.outBins = [bitAdd(inputObj.inBins, 5, inputObj.doInvert)];
  },
  4: (inputObj) => {
    inputObj.outBins = [bitAdd(inputObj.inBins, 7, inputObj.doInvert)];
  },
  5: (inputObj) => {
    inputObj.outBins = [bitAdd(inputObj.inBins, 11, inputObj.doInvert)];
  },
  6: (inputObj) => {
    inputObj.outBins = [bitAdd(inputObj.inBins, 13, inputObj.doInvert)];
  },
  7: (inputObj) => {
    if (!inputObj.doInvert) {
      inputObj.outBins = [shuffleStr(inputObj.inBins, 3)];
    } else {
      inputObj.outBins = [unShuffleStr(inputObj.inBins, 3)];
    }
  },
  8: (inputObj) => {
    if (!inputObj.doInvert) {
      inputObj.outBins = [shuffleStr(inputObj.inBins, 5)];
    } else {
      inputObj.outBins = [unShuffleStr(inputObj.inBins, 5)];
    }
  },
  9: (inputObj) => {
    if (!inputObj.doInvert) {
      inputObj.outBins = [shuffleStr(inputObj.inBins, 7)];
    } else {
      inputObj.outBins = [unShuffleStr(inputObj.inBins, 7)];
    }
  },
  A: (inputObj) => {
    inputObj.outBins = [longXor(inputObj.inBins, _xorNums[0])];
  },
  B: (inputObj) => {
    inputObj.outBins = [longXor(inputObj.inBins, _xorNums[1])];
  },
  C: (inputObj) => {
    inputObj.outBins = [longXor(inputObj.inBins, _xorNums[2])];
  },
  D: (inputObj) => {
    inputObj.outBins = [longXor(inputObj.inBins, _xorNums[3])];
  },
  E: (inputObj) => {
    inputObj.outBins = [longXor(inputObj.inBins, _xorNums[4])];
  },
  F: (inputObj) => {
    inputObj.outBins = [longXor(inputObj.inBins, _xorNums[5])];
  },
};

var Ops2 = {
  0: (inputObj) => {
    inputObj.outBins = [inputObj.inBins];
  },
  1: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '1111111111111111')];
  },
  2: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000000100000001')];
  },
  3: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000001000000010')];
  },
  4: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000010000000100')];
  },
  5: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000100000001000')];
  },
  6: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0001000000010000')];
  },
  7: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0010000000100000')];
  },
  8: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0100000001000000')];
  },
  9: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '1000000010000000')];
  },
  A: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000011100000111')];
  },
  B: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000111000001110')];
  },
  C: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0001110000011100')];
  },
  D: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0011100000111000')];
  },
  E: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0111000001110000')];
  },
  F: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '1110000011100000')];
  },
};

var Ops3 = {
  0: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '1000000000000000')];
    // inputObj.outBins = [inputObj.inBins];
  },
  1: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000000000000001')];
  },
  2: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000000000000010')];
  },
  3: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000000000000100')];
  },
  4: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000000000001000')];
  },
  5: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000000000010000')];
  },
  6: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000000000100000')];
  },
  7: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000000001000000')];
  },
  8: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000000010000000')];
  },
  9: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000000100000000')];
  },
  A: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000001000000000')];
  },
  B: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000010000000000')];
  },
  C: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0000100000000000')];
  },
  D: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0001000000000000')];
  },
  E: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0010000000000000')];
  },
  F: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '0100000000000000')];
  },
};

var Ops4 = {
  0: (inputObj) => {
    inputObj.outBins = [inputObj.inBins];
  },
  1: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '00000001')];
  },
  2: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '00000010')];
  },
  3: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '00000100')];
  },
  4: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '00001000')];
  },
  5: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '00010000')];
  },
  6: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '00100000')];
  },
  7: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '01000000')];
  },
  8: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '10000000')];
  },
  9: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '00000011')];
  },
  A: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '00001100')];
  },
  B: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '00110000')];
  },
  C: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '11000000')];
  },
  D: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '00001111')];
  },
  E: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '00111100')];
  },
  F: (inputObj) => {
    inputObj.outBins = [bitwiseXor(inputObj.inBins, '11110000')];
  },
};

const Ops = Ops4;

module.exports = { Ops };
