const { _hexOut, _numBytes, _numBits } = require('./settings');
const fs = require('fs');
const path = require('path');

function xor(char1, char2) {
  var r = char1 === char2 ? '0' : '1';
  return r;
}

function longXor(s1, s2) {
  var ret = '';
  for (let i = 0; i < _numBits; i++) {
    var x = xor(s1[i], s2[i]);
    ret += x;
  }
  return ret;
}

function bitAdd(c, n, doSubtract = false) {
  var int = parseInt(c, 2);
  var powerOfTwoMod = 2 ** _numBits;
  if (doSubtract) {
    n = n * -1;
  }
  var retInt = (int + n + powerOfTwoMod) % powerOfTwoMod;
  return retInt.toString(2).padStart(_numBits, '0');
}

function hex2bin(hex) {
  return parseInt(hex, 16).toString(2).padStart(_numBits, '0');
}

function specialMod(value) {
  var modNum = modMax + 1 - modMin; // +1 for min through max inclusive
  return ((value + modNum) % modNum) + modMin;
}

function getStringChecksum(s) {
  var sum = 0;
  for (let i = 0; i < s.length; i++) {
    var val = s[i].charCodeAt();
    sum = (sum + val) % 255;
  }
  return sum;
}

function getByteChecksum(arr) {
  var sum = 0;
  for (let i = 0; i < arr.length; i++) {
    var val = parseInt(arr[i], 16);
    sum = (sum + val) % 255;
  }
  return sum;
}

function shuffle(a) {
  if (a.length < 2) return a;
  var a1 = a.slice(0, -1);
  var a2 = a.slice(-1);
  return a2.concat(a1);
}

function unShuffle(a) {
  if (a.length < 2) return a;
  var a1 = a.slice(0, 1);
  var a2 = a.slice(1);
  return a2.concat(a1);
}

function charHexArrayToString(a) {
  var cipher = '';
  for (let i = 0; i < a.length; i++) {
    cipher += String.fromCharCode('0x' + a[i]);
  }
  return cipher;
}

function stringToCharHexArray(s) {
  var hexArray = [];
  for (let i = 0; i < s.length; i++) {
    var el = s[i];
    var charCode = el.charCodeAt();
    var stringCode = charCode.toString(16);
    var paddedStringCode = stringCode.padStart(_numBytes, '0');
    hexArray.push(paddedStringCode);
    if (paddedStringCode.length > _numBytes) {
      console.log(paddedStringCode);
    }
  }
  return hexArray;
}

function shuffleStr(s, amount) {
  if (s.length < 2) return s;
  var s1 = s.substr(0, s.length - amount);
  var s2 = s.substr(s.length - amount);
  return s2 + s1;
}

function unShuffleStr(s, amount) {
  if (s.length < 2) return s;
  var s1 = s.substr(0, amount);
  var s2 = s.substr(amount);
  return s2 + s1;
}

function randomBits(n = _numBits) {
  var ret = '';
  for (let i = 0; i < n; i++) {
    if (Math.random() > 0.5) {
      ret += '0';
    } else {
      ret += '1';
    }
  }
  return ret;
}

function ConsoleOut(label, array) {
  if (_hexOut) {
    console.log(label.padEnd(10, ' ') + ':', array);
  } else {
    console.log(label.padEnd(10, ' ') + ':', charHexArrayToString(array));
  }
}

function arrayEquals(a, b) {
  return (
    Array.isArray(a) &&
    Array.isArray(b) &&
    a.length === b.length &&
    a.every((val, index) => val === b[index])
  );
}

function readText(file) {
  var fullPath = path.resolve(__dirname, file);
  var data = fs.readFileSync(fullPath, 'utf8');
  var inLinesArray = data.split('\n');
  var outLinesArray = [];
  for (let i = 0; i < inLinesArray.length; i++) {
    const el = inLinesArray[i].trim();
    outLinesArray.push(el);
  }
  return outLinesArray;
}

module.exports = {
  xor,
  longXor,
  bitAdd,
  hex2bin,
  specialMod,
  getByteChecksum,
  shuffle,
  unShuffle,
  charHexArrayToString,
  stringToCharHexArray,
  shuffleStr,
  unShuffleStr,
  randomBits,
  ConsoleOut,
  arrayEquals,
  readText,
};
