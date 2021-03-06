const _numLoops = 12; // number of times encrypted

const _verbose = 0; // 0 is no print out; 1 is important print outs; 2 is all print outs

const _hexOut = true; // if true, print out hex array; otherwise, print chars

const _numBytes = 4; // don't hate me, it's actually the number of bytes, but rather the number of hex digits accounted for each char
const _numBits = _numBytes * 4;
const _numPartBytes = 2; // see above
const _numPartBits = _numPartBytes * 4;

const _OpsNum = 5; // 1 | 2 | 3 | 4 | 5 ; determines the set of OPS to use
const _keyChars = '0123456789'; // _OpsNum =  5
// const _keyChars = '0123456789ABCEDF';

// const _key = 'ab8cfe8d1912482c58c701d44912a2b5'.toUpperCase();
// const _key = '00000000000000000000000000000000';
const _key = '98045268875385354012579748369712';

const _xorNums = [
  '0101101101011011',
  '0110011001100110',
  '0100111001001110',
  '1000001010000010',
  '0001111100011111',
  '1011000010110000',
];

// const _xorNums = [
//   '0010001000100010',
//   '0001000100010001',
//   '1000100010001000',
//   '0100010001000100',
//   '0010001000100010',
//   '0001000100010001',
// ];

const _message = 'Hello!';
// const _message = 'Hello World!';

module.exports = {
  _key,
  _numLoops,
  _verbose,
  _hexOut,
  _message,
  _numBytes,
  _numBits,
  _numPartBytes,
  _numPartBits,
  _xorNums,
  _keyChars,
  _OpsNum,
};
