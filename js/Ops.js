const { longXor, bitAdd, shuffleStr, unShuffleStr } = require('./functions');
const { _numBits, _xorNums } = require('./settings');

/*
inputObj = {
  inBins: string,
  doInvert: bool,
  inputIndexOffset: int,
  outBins: string[],
}
*/
const Ops = {
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
  // DO NOT USE. the advantages are lost is the key doesn't contain "G"
  // and when only 1 G is involved, the encrypted message length was doubled; it's worse with more Gs
  // G: (inputObj) => {
  //   if (!inputObj.doInvert) {
  //     // inputObj.outBins = [inputObj.ascii, random8Bits()];
  //     inputObj.outBins = [inputObj.ascii, randomBits()];
  //   } else {
  //     inputObj.outBins = [inputObj.ascii];
  //     inputObj.inputIndexOffset++;
  //   }
  // },
};

module.exports = { Ops };
