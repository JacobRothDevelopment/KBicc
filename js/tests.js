const { Encrypt, Decrypt } = require('./algorithms');
const {
  xor,
  longXor,
  bitAdd,
  hex2bin,
  specialMod,
  getChecksum,
  shuffle,
  unShuffle,
  shuffleStr,
  unShuffleStr,
  charHexArrayToString,
  random8Bits,
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

var arr = [];
console.log(arr);
for (let i = 0; i < 4; i++) {
  arr.push(i);
  console.log(arr);
}
for (let i = 0; i < 4; i++) {
  arr.pop();
  console.log(arr);
}
