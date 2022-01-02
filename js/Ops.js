const { longXor, bitAdd, randomBits } = require('./functions');
const { _numBits, _xorNums } = require('./settings');

/*
inputObj = {
  ascii: string,
  doInvert: bool,
  inputIndexOffset: int,
  outBins: string[],
}
*/
const Ops = {
  0: (inputObj) => {
    inputObj.outBins = [inputObj.ascii];
  },
  1: (inputObj) => {
    inputObj.outBins = [bitAdd(inputObj.ascii, inputObj.doInvert ? -1 : 1)];
  },
  2: (inputObj) => {
    inputObj.outBins = [bitAdd(inputObj.ascii, inputObj.doInvert ? -1 : 1)];
  },
  3: (inputObj) => {
    inputObj.outBins = [bitAdd(inputObj.ascii, inputObj.doInvert ? -1 : 1)];
  },
  4: (inputObj) => {
    inputObj.outBins = [bitAdd(inputObj.ascii, inputObj.doInvert ? -1 : 1)];
  },
  5: (inputObj) => {
    inputObj.outBins = [bitAdd(inputObj.ascii, inputObj.doInvert ? -1 : 1)];
  },
  6: (inputObj) => {
    inputObj.outBins = [bitAdd(inputObj.ascii, inputObj.doInvert ? -1 : 1)];
  },
  7: (inputObj) => {
    inputObj.outBins = [bitAdd(inputObj.ascii, inputObj.doInvert ? -1 : 1)];
  },
  8: (inputObj) => {
    inputObj.outBins = [bitAdd(inputObj.ascii, inputObj.doInvert ? -1 : 1)];
  },
  9: (inputObj) => {
    inputObj.outBins = [bitAdd(inputObj.ascii, inputObj.doInvert ? -1 : 1)];
  },
  A: (inputObj) => {
    inputObj.outBins = [
      longXor(inputObj.ascii, _xorNums[0].padStart(_numBits, '0')),
    ];
  },
  B: (inputObj) => {
    inputObj.outBins = [
      longXor(inputObj.ascii, _xorNums[1].padStart(_numBits, '0')),
    ];
  },
  C: (inputObj) => {
    inputObj.outBins = [
      longXor(inputObj.ascii, _xorNums[2].padStart(_numBits, '0')),
    ];
  },
  D: (inputObj) => {
    inputObj.outBins = [
      longXor(inputObj.ascii, _xorNums[3].padStart(_numBits, '0')),
    ];
  },
  E: (inputObj) => {
    inputObj.outBins = [
      longXor(inputObj.ascii, _xorNums[4].padStart(_numBits, '0')),
    ];
  },
  F: (inputObj) => {
    inputObj.outBins = [
      longXor(inputObj.ascii, _xorNums[5].padStart(_numBits, '0')),
    ];
  },
  // DO NOT USE. the advantages are lost is the key doesn't contain "G"
  // and when only 1 G is involved, the encrypted message length was doubled; it's worse with more Gs
  G: (inputObj) => {
    if (!inputObj.doInvert) {
      // inputObj.outBins = [inputObj.ascii, random8Bits()];
      inputObj.outBins = [inputObj.ascii, randomBits()];
    } else {
      inputObj.outBins = [inputObj.ascii];
      inputObj.inputIndexOffset++;
    }
  },
};

module.exports = { Ops };
