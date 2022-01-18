const { Encrypt, Decrypt } = require('./algorithms');
const {
  xor,
  longXor,
  bitAdd,
  hex2bin,
  specialMod,
  shuffle,
  unShuffle,
  shuffleStr,
  charHexArrayToString,
  randomBits,
  ConsoleOut,
  arrayEquals,
  getByteChecksum,
  readText,
  stringToCharHexArray,
  iterateKeyChar,
  genKey,
} = require('./functions');

// getChecksum('abcd1234');

// console.log(shuffle([1, 2, 3, 4, 5])); // should return 5,1,2,3,4
// console.log(shuffle([1])); // should return 1
// console.log(unShuffle([5, 1, 2, 3, 4])); // should return 1,2,3,4,5
// console.log(unShuffle([1])); // should return 1

// var strings = [
//   'Hello World:',
//   'Hello World!1',
//   'Hello World!z',
//   'Hello World!',
//   'Hello World!]',
//   'Hello World?',
//   'Hello World?]',
// ];
// for (let i = 0; i < strings.length; i++) {
//   console.log(getChecksum(strings[i]));
// }

// var a = [1, 2, 3, 4];
// console.log(a.push(5));
// console.log(a.pop());
// console.log(a);

// console.log(shuffleStr('12345', 1)); // should return 51234
// console.log(shuffleStr('12345', 2)); // should return 45123
// console.log(shuffleStr('1', 1)); // should return 1
// console.log(unShuffleStr('51234', 1)); // should return 12345
// console.log(unShuffleStr('51234', 2)); // should return 23451
// console.log(unShuffleStr('1', 1)); // should return 1

// console.log(random8Bits());

// var arr = [];
// console.log(arr);
// for (let i = 0; i < 4; i++) {
//   arr.push(i);
//   console.log(arr);
// }
// for (let i = 0; i < 4; i++) {
//   arr.pop();
//   console.log(arr);
// }

// console.log('a' ^ 'b');
// console.log('a' | 'b');
// console.log(5 | 4); // or
// console.log(5 ^ 4); // xor

// var dict = {
//   key: 'value',
// };
// console.log(dict['key']);
// console.log(dict['key2']);
// console.log(dict['key2'] == undefined);

// console.log('0', iterateKeyChar('0', 1)); // 1
// console.log('1', iterateKeyChar('1', 0)); // 1
// console.log('2', iterateKeyChar('2', -1)); // 1
// console.log('3', iterateKeyChar('3', -16)); // 3
// console.log('4', iterateKeyChar('4', 16)); // 4
// console.log('5', iterateKeyChar('5', 2)); // 7
// console.log('9', iterateKeyChar('9', 1)); // A
// console.log('A', iterateKeyChar('A', 1)); // B
// console.log('F', iterateKeyChar('F', 1)); // 0

console.log(genKey(32));
