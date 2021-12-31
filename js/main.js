/*
KBicc - Key Base Instruction Caesar Cipher

KBicc is a simple symmetric encryption algorithm where the actions performed on the outgoing message is dependant on the encryption key itself
*/
const start = new Date();

const { Encrypt, Decrypt } = require('./algorithms');
const {
  getChecksum,
  charHexArrayToString,
  shuffleStr,
} = require('./functions');

const { key, numLoops, verbose, bitsOut, message } = require('./settings');

var hexArrayInput = [];
for (let i = 0; i < message.length; i++) {
  hexArrayInput.push(message[i].charCodeAt().toString(16).padStart(2, '0'));
}

var middleOutput2 = Encrypt(hexArrayInput, key, numLoops);
var hexArrayOutput = Decrypt(middleOutput2, key, numLoops);

console.log(
  'SUCCESSFUL :',
  charHexArrayToString(hexArrayInput) === charHexArrayToString(hexArrayOutput)
);

console.log('execution time\t:', new Date() - start + ' ms');
