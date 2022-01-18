const { Ops } = require('./Ops');
const {
  hex2bin,
  shuffle,
  unShuffle,
  getByteChecksum,
  shuffleStr,
  ConsoleOut,
  iterateKeyChar,
  randomBits,
} = require('./functions');
const {
  _verbose,
  _numBytes,
  _numBits,
  _numPartBytes,
  _numPartBits,
  _numLoops,
} = require('./settings');

/**
input = array of hex value strings (each element should be 8 bits long); 
rawKey = the key as given by the 
*/
function Encrypt(input, rawKey) {
  var hexArrayOutput = [];

  for (let j = 0; j < _numLoops; j++) {
    hexArrayOutput = [];

    // var checksum = getByteChecksum(input) % 2 ** _numPartBits;
    // TODO: mod by key length is dumb; part of the whole shit is that the key can be any length
    // i get the mod has to happen for index-out-of-bounds reasons but that can happen when creating the substrings; doing it here reveals the key length
    // var checksumHex = checksum.toString(16).padStart(_numPartBytes, '0');
    var shuffleVar = parseInt(randomBits(), 2);
    var shuffleHex = shuffleVar.toString(16).padStart(_numPartBytes, '0');
    var key = shuffleStr(rawKey, shuffleVar); // the key which has been shifted

    for (let i = 0; i < input.length; i++) {
      var keyChar = key[(i + j) % key.length];
      var newKey = iterateKeyChar(keyChar, i + j);
      var op = Ops[newKey];
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
        var outHex = parseInt(hexChar, 2)
          .toString(16)
          .padStart(_numPartBytes, '0');
        hexArrayOutput.push(outHex);
      }
    }
    // hexArrayOutput.push(checksumHex);
    hexArrayOutput.push(shuffleHex);
    input = shuffle(hexArrayOutput);

    if (_verbose == 2) {
      ConsoleOut('encrypt' + j, hexArrayOutput);
    }
  }

  return hexArrayOutput;
}

/**
input = array of hex value strings (each element should be 8 bits long); 
rawKey = the key as given by the 
*/
function Decrypt(input, rawKey) {
  var hexArrayOutput = [];

  for (let j = _numLoops - 1; j >= 0; j--) {
    hexArrayOutput = [];

    var shuffleHexOut = input.pop();
    var shuffleOut = parseInt(shuffleHexOut, 16);
    var key = shuffleStr(rawKey, shuffleOut); // the key which has been shifted
    var inputIndexOffset = 0;

    for (let i = 0; i + inputIndexOffset < input.length; i++) {
      var keyChar = key[(i + j + key.length) % key.length];
      var newKey = iterateKeyChar(keyChar, i + j);
      var op = Ops[newKey];
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
        var outHex = parseInt(hexChar, 2)
          .toString(16)
          .padStart(_numPartBytes, '0');
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
