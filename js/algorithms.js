const { Ops } = require('./Ops');
const {
  hex2bin,
  shuffle,
  unShuffle,
  getByteChecksum,
  shuffleStr,
} = require('./functions');
const { verbose } = require('./settings');

function Encrypt(input, rawKey, numLoops) {
  if (verbose) {
    console.log('SUBMIT\t:', input);
  }

  var hexArrayOutput = [];

  for (let j = 0; j < numLoops; j++) {
    hexArrayOutput = [];

    var checksum = getByteChecksum(input) % rawKey.length;
    var checksumHex = checksum.toString(16).padStart(2, '0');
    var key = shuffleStr(rawKey, checksum); // the key which has been shifted by the checksum

    var keyOffset = 0;
    for (let i = 0; i < input.length; i++) {
      // var keyChar = key[(keyOffset + j) % key.length];
      // keyOffset++;
      var keyChar = key[(i + j) % key.length];
      var op = Ops[keyChar];
      var charAsciiHex = input[i];
      var charAsciiBin = hex2bin(charAsciiHex);
      var inputObj = {
        ascii: charAsciiBin,
        doInvert: false,
        index: i,
        outBins: [],
      };
      op(inputObj);
      i = inputObj.index;
      for (let index = 0; index < inputObj.outBins.length; index++) {
        var hexChar = inputObj.outBins[index];
        var outHex = parseInt(hexChar, 2).toString(16).padStart(2, '0');
        hexArrayOutput.push(outHex);
      }
    }
    hexArrayOutput.push(checksumHex);
    input = shuffle(hexArrayOutput);

    if (verbose) {
      console.log('encrypt' + j + ':', hexArrayOutput);
    }
  }

  return hexArrayOutput;
}

function Decrypt(input, rawKey, numLoops) {
  if (verbose) {
    console.log('SENT\t:', input);
  }

  var hexArrayOutput = [];

  for (let j = numLoops - 1; j >= 0; j--) {
    hexArrayOutput = [];

    var checksumHexOut = input.pop();
    var checksumOut = parseInt(checksumHexOut, 16) % rawKey.length;
    var key = shuffleStr(rawKey, checksumOut); // the key which has been shifted by the checksum

    for (let i = 0; i < input.length; i++) {
      var keyChar = key[(i + j + key.length) % key.length];
      var op = Ops[keyChar];
      var charAsciiHex = input[i];
      var charAsciiBin = hex2bin(charAsciiHex);
      var inputObj = {
        ascii: charAsciiBin,
        doInvert: true,
        index: i,
        outBins: [],
      };
      op(inputObj);
      i = inputObj.index;
      for (let index = 0; index < inputObj.outBins.length; index += 2) {
        var hexChar = inputObj.outBins[index];
        var outHex = parseInt(hexChar, 2).toString(16).padStart(2, '0');
        hexArrayOutput.push(outHex);
      }
    }
    input = unShuffle(hexArrayOutput);

    if (verbose) {
      console.log('decrypt' + j + ':', hexArrayOutput);
    }
  }

  return hexArrayOutput;
}

module.exports = { Encrypt, Decrypt };
