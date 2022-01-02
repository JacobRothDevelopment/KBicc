/*
KBicc - Key Base Instruction Caesar Cipher

KBicc is a simple symmetric encryption algorithm where the actions performed on the outgoing message is dependant on the encryption key itself
*/
const start = new Date();

const { _key, _numLoops, _message, _verbose } = require('./settings');
const { Encrypt, Decrypt } = require('./algorithms');
const {
  arrayEquals,
  stringToCharHexArray,
  ConsoleOut,
} = require('./functions');

var hexArrayInput = stringToCharHexArray(_message);

var middleOutput2 = Encrypt(hexArrayInput, _key, _numLoops);
var hexArrayOutput = Decrypt(middleOutput2, _key, _numLoops);

const exeTime = new Date() - start;

if (_verbose == 1) {
  ConsoleOut('RECEIVED', hexArrayOutput);
}

console.log('SUCCESSFUL :', arrayEquals(hexArrayInput, hexArrayOutput));

console.log('execution time\t:', exeTime + ' ms');
