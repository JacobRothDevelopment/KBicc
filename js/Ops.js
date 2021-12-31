const { longXor, bitAdd, random8Bits } = require('./functions');

/*
inputObj = {
  ascii: string,
  doInvert: bool,
  index: int,
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
    inputObj.outBins = [longXor(inputObj.ascii, '01011011')];
  },
  B: (inputObj) => {
    inputObj.outBins = [longXor(inputObj.ascii, '01100110')];
  },
  C: (inputObj) => {
    inputObj.outBins = [longXor(inputObj.ascii, '01001110')];
  },
  D: (inputObj) => {
    inputObj.outBins = [longXor(inputObj.ascii, '10000010')];
  },
  E: (inputObj) => {
    inputObj.outBins = [longXor(inputObj.ascii, '00011111')];
  },
  F: (inputObj) => {
    inputObj.outBins = [longXor(inputObj.ascii, '10110000')];
  },
  G: (inputObj) => {
    if (!inputObj.doInvert) {
      inputObj.outBins = [random8Bits(), inputObj.ascii];
    } else {
      inputObj.outBins = [];
      inputObj.index++;
    }
  },
};

module.exports = { Ops };
