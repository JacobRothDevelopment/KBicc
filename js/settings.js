const _numLoops = 16; // number of
const _verbose = 0; // 0 is no print out; 1 is important print outs; 2 is all print outs
const _hexOut = true; // if true, print out hex array; otherwise, print chars
const _numBytes = 4; // don't hate me, it's actually the number of bytes, but rather the number of hex digits accounted for each char
const _numBits = _numBytes * 4;
const _key = 'ab8cfe8d1912482c58c701d44912a2b5'.toUpperCase();

const _xorNums = [
  '0101101101011011',
  '0110011001100110',
  '0100111001001110',
  '1000001010000010',
  '0001111100011111',
  '1011000010110000',
];

const _message = 'Hello World!';
// const _message =
// "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

module.exports = {
  _key,
  _numLoops,
  _verbose,
  _hexOut,
  _message,
  _numBytes,
  _numBits,
  _xorNums,
};
