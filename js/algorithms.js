const { Ops } = require('./Ops');
const {
  hex2bin,
  shuffle,
  unShuffle,
  getByteChecksum,
  shuffleStr,
  ConsoleOut,
} = require('./functions');
const { _verbose, _numBytes, _numBits } = require('./settings');

/*
input = array of hex value strings
rawKey = the key as given by the 
*/
function Encrypt(input, rawKey, numLoops) {
  if (_verbose > 0) {
    ConsoleOut('SUBMIT', input);
  }

  var hexArrayOutput = [];

  for (let j = 0; j < numLoops; j++) {
    hexArrayOutput = [];

    var checksum = getByteChecksum(input) % rawKey.length;
    var checksumHex = checksum.toString(16).padStart(_numBytes, '0');
    var key = shuffleStr(rawKey, checksum); // the key which has been shifted by the checksum

    for (let i = 0; i < input.length; i++) {
      var keyChar = key[(i + j) % key.length];
      var op = Ops[keyChar];
      var charAsciiHex = input[i];
      var charAsciiBin = hex2bin(charAsciiHex);
      var inputObj = {
        inBins: charAsciiBin,
        doInvert: false,
        index: i,
        outBins: [],
      };
      op(inputObj); // have to do this because I need to pass by reference
      i = inputObj.index;
      for (let index = 0; index < inputObj.outBins.length; index++) {
        var hexChar = inputObj.outBins[index];
        var outHex = parseInt(hexChar, 2).toString(16).padStart(_numBytes, '0');
        hexArrayOutput.push(outHex);
      }
    }
    hexArrayOutput.push(checksumHex);
    input = shuffle(hexArrayOutput);

    if (_verbose == 2) {
      ConsoleOut('encrypt' + j, hexArrayOutput);
    }
  }

  return hexArrayOutput;
}

function Decrypt(input, rawKey, numLoops) {
  if (_verbose == 1) {
    ConsoleOut('SENT', input);
  }

  var hexArrayOutput = [];

  for (let j = numLoops - 1; j >= 0; j--) {
    hexArrayOutput = [];

    var checksumHexOut = input.pop();
    var checksumOut = parseInt(checksumHexOut, 16) % rawKey.length;
    var key = shuffleStr(rawKey, checksumOut); // the key which has been shifted by the checksum
    var inputIndexOffset = 0;

    for (let i = 0; i + inputIndexOffset < input.length; i++) {
      var keyChar = key[(i + j + key.length) % key.length];
      var op = Ops[keyChar];
      var charAsciiHex = input[i + inputIndexOffset];
      var charAsciiBin = hex2bin(charAsciiHex);
      var inputObj = {
        inBins: charAsciiBin,
        doInvert: true,
        inputIndexOffset: inputIndexOffset,
        outBins: [],
      };
      op(inputObj);
      inputIndexOffset = inputObj.inputIndexOffset;

      for (let index = 0; index < inputObj.outBins.length; index += 2) {
        var hexChar = inputObj.outBins[index];
        var outHex = parseInt(hexChar, 2).toString(16).padStart(_numBytes, '0');
        hexArrayOutput.push(outHex);
      }
    }
    input = unShuffle(hexArrayOutput);

    if (_verbose == 2) {
      ConsoleOut('decrypt' + j, hexArrayOutput);
    }
  }

  return hexArrayOutput;
}

module.exports = { Encrypt, Decrypt };
