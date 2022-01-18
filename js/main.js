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
if (_verbose > 0) ConsoleOut('SUBMIT', hexArrayInput);

var middleOutput2 = Encrypt(hexArrayInput, _key);
if (_verbose == 1) ConsoleOut('SUBMIT', hexArrayInput);

var hexArrayOutput = Decrypt(middleOutput2, _key);
if (_verbose == 1) ConsoleOut('SUBMIT', hexArrayInput);

const exeTime = new Date() - start;

if (_verbose == 1) {
  ConsoleOut('RECEIVED', hexArrayOutput);
}

ConsoleOut('SUCCESSFUL', arrayEquals(hexArrayInput, hexArrayOutput));

ConsoleOut('exe time', exeTime + ' ms');
