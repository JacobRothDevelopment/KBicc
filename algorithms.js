const { Ops } = require('./Ops');
const {
  hex2bin,
  shuffle,
  unShuffle,
  charHexArrayToString,
} = require('./functions');

function Encrypt(input, key, numLoops) {
  var hexArrayOutput = [];

  for (let j = 0; j < numLoops; j++) {
    hexArrayOutput = [];
    for (let i = 0; i < input.length; i++) {
      var keyChar = key[(i + j) % key.length];
      var op = Ops[keyChar];
      var charAsciiHex = input[i];
      var charAsciiBin = hex2bin(charAsciiHex);
      var outBin = op(charAsciiBin, 1);
      var outHex = parseInt(outBin, 2).toString(16).padStart(2, '0');
      hexArrayOutput.push(outHex);
    }
    input = shuffle(hexArrayOutput);
  }

  return hexArrayOutput;
}

function Decrypt(input, key, numLoops) {
  var hexArrayOutput = [];

  for (let j = numLoops - 1; j >= 0; j--) {
    hexArrayOutput = [];
    for (let i = 0; i < input.length; i++) {
      var keyChar = key[(i + j + key.length) % key.length];
      var op = Ops[keyChar];
      var charAsciiHex = input[i];
      var charAsciiBin = hex2bin(charAsciiHex);
      var outBin = op(charAsciiBin, -1);
      var outHex = parseInt(outBin, 2).toString(16).padStart(2, '0');
      hexArrayOutput.push(outHex);
    }
    input = unShuffle(hexArrayOutput);
  }

  return hexArrayOutput;
}

module.exports = { Encrypt, Decrypt };
