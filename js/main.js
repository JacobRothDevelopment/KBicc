/*
KBicc - Key Base Instruction Caesar Cipher

KBicc is a simple symmetric encryption algorithm where the actions performed on the outgoing message is dependant on the encryption key itself
*/

const { Encrypt, Decrypt } = require('./algorithms');
const {
  charHexArrayToString,
  getChecksum,
  shuffleStr,
  unShuffleStr,
} = require('./functions');

const { key, numLoops, verbose, bitsOut, message } = require('./settings');

var hexArrayInput = [];
for (let i = 0; i < message.length; i++) {
  hexArrayInput.push(message[i].charCodeAt().toString(16).padStart(2, '0'));
}

var checksum = getChecksum(message) % key.length;
var checksumHex = checksum.toString(16);
var checksumKey = shuffleStr(key, checksum);
var middleOutput1 = Encrypt(hexArrayInput, checksumKey, 1);
middleOutput1.push(checksumHex);
var middleOutput2 = Encrypt(middleOutput1, key, numLoops);

var middleOutput3 = Decrypt(middleOutput2, key, numLoops);
var checksumHexOut = middleOutput3.pop();
var checksumOut = parseInt(checksumHexOut, 16) % key.length;
var checksumKeyOut = shuffleStr(key, checksumOut);
var hexArrayOutput = Decrypt(middleOutput3, checksumKeyOut, 1);

if (bitsOut) {
  console.log('SUBMIT     :', hexArrayInput);
  if (verbose) {
    console.log('Mid1       :', middleOutput1);
    console.log('Mid2/SENT  :', middleOutput2);
    console.log('Mid3       :', middleOutput3);
  }
  console.log('RECEIVED   :', hexArrayOutput);
} else {
  console.log('SUBMIT     :', charHexArrayToString(hexArrayInput));
  if (verbose) {
    console.log('Mid1       :', charHexArrayToString(middleOutput1));
    console.log('Mid2/SENT  :', charHexArrayToString(middleOutput2));
    console.log('Mid3       :', charHexArrayToString(middleOutput3));
  }
  console.log('RECEIVED   :', charHexArrayToString(hexArrayOutput));
}
console.log(
  'SUCCESSFUL :',
  charHexArrayToString(hexArrayInput) === charHexArrayToString(hexArrayOutput)
);
