const {
  _hexOut,
  _numBytes,
  _numBits,
  _numPartBytes,
  _numPartBits,
  _keyChars,
} = require('./settings');
const fs = require('fs');
const path = require('path');

function xor(char1, char2) {
  var r = char1 === char2 ? '0' : '1';
  return r;
}

function longXor(s1, s2) {
  var ret = '';
  for (let i = 0; i < _numPartBits; i++) {
    var x = xor(s1[i], s2[i]);
    ret += x;
  }
  return ret;
}

function bitwiseXor(b1, b2) {
  var n1 = parseInt(b1.substring(0, _numPartBits), 2);
  var n2 = parseInt(b2.substring(0, _numPartBits), 2);
  var xor = n1 ^ n2;
  return xor.toString(2).padStart(_numPartBits, 0);
}

function bitAdd(c, n, doSubtract = false) {
  var int = parseInt(c, 2);
  var powerOfTwoMod = 2 ** _numPartBits;
  if (doSubtract) {
    n = n * -1;
  }
  var retInt = (int + n + powerOfTwoMod) % powerOfTwoMod;
  return retInt.toString(2).padStart(_numPartBits, '0');
}

function hex2bin(hex) {
  return parseInt(hex, 16).toString(2).padStart(_numPartBits, '0');
}

function specialMod(value) {
  var modNum = modMax + 1 - modMin; // +1 for min through max inclusive
  return ((value + modNum) % modNum) + modMin;
}

function absoluteMod(value, mod) {
  var a = value % mod;
  return (a + mod) % mod;
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
    sum = sum + val;
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
  var properSizeHexCharArray = [];
  var numPartsInWhole = _numBytes / _numPartBytes;
  for (let i = 0; i < a.length; i += numPartsInWhole) {
    var fullCharHex = '';
    for (let j = i; j < i + numPartsInWhole; j++) {
      fullCharHex += a[j];
    }
    properSizeHexCharArray.push(fullCharHex);
  }

  var string = '';
  for (let i = 0; i < properSizeHexCharArray.length; i++) {
    string += String.fromCharCode('0x' + properSizeHexCharArray[i]);
  }
  return string;
}

function stringToCharHexArray(s) {
  var hexArray = []; // each element is _numPartBytes long
  for (let i = 0; i < s.length; i++) {
    var el = s[i];
    var charCode = el.charCodeAt();
    var stringCode = charCode.toString(16);
    var paddedStringCode = stringCode.padStart(_numBytes, '0');

    // split full hex into equal sized parts of length _numPartBytes
    for (let i = 0; i < _numBytes / _numPartBytes; i++) {
      var bytePart = paddedStringCode.substring(
        i * _numPartBytes,
        (i + 1) * _numPartBytes
      );
      hexArray.push(bytePart);
    }
  }
  return hexArray;
}

function shuffleStr(s, amount) {
  var actualAmount = amount % s.length;
  if (s.length < 2) return s;
  // var s1 = s.substr(0, s.length - actualAmount);
  // var s2 = s.substr(s.length - actualAmount);
  var s1 = s.substring(0, actualAmount);
  var s2 = s.substring(actualAmount);
  return s2 + s1;
}

function unShuffleStr(s, amount) {
  if (s.length < 2) return s;
  var s1 = s.substr(0, amount);
  var s2 = s.substr(amount);
  return s2 + s1;
}

function randomBits(l = _numPartBits) {
  var ret = '';
  for (let i = 0; i < l; i++) {
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

function iterateKeyChar(char, i) {
  var index = _keyChars.indexOf(char);
  return _keyChars[absoluteMod(index + i, _keyChars.length)];
}

function iterateKeyChars(key, n) {
  var newKey = '';
  for (let i = 0; i < key.length; i++) {
    newKey += iterateKeyChar(key[i], n);
  }
  return newKey;
}

function genKey(length) {
  var key = '';
  for (let i = 0; i < length; i++) {
    var randomIndex = Math.floor(Math.random() * _keyChars.length);
    var randomKeyChar = _keyChars[randomIndex];
    key += randomKeyChar;
  }
  return key;
}

function genKeys(length, num) {
  var keys = [];
  for (let i = 0; i < num; i++) {
    var key = genKey(length);
    keys.push(key);
  }
  return keys;
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
  bitwiseXor,
  iterateKeyChar,
  absoluteMod,
  genKey,
  genKeys,
  iterateKeyChars,
};
