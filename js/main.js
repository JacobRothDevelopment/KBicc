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

const key = 'ab8cfe8d1912482c58c701d44912a2b5'.toUpperCase();
const numLoops = 8;
const verbose = true;

// const message = 'Hello World?';
const message =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

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

console.log('SUBMIT     :', charHexArrayToString(hexArrayInput));
if (verbose) {
  console.log('Mid1       :', charHexArrayToString(middleOutput1));
  console.log('Mid2/SENT  :', charHexArrayToString(middleOutput2));
  console.log('Mid3       :', charHexArrayToString(middleOutput3));
}
console.log('RECEIVED   :', charHexArrayToString(hexArrayOutput));

console.log(
  'SUCCESSFUL :',
  charHexArrayToString(hexArrayInput) === charHexArrayToString(hexArrayOutput)
);
