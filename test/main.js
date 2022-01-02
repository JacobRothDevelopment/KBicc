// const data = require('../inputs.json');
const { Encrypt, Decrypt } = require('../js/algorithms');
const {
  stringToCharHexArray,
  arrayEquals,
  readText,
} = require('../js/functions');
const { ResultsDict } = require('../js/ResultsDict');
const { _numLoops } = require('../js/settings');

const _keysLimit = 1000;
const _messageLimit = 1;
const _keysFile = '../inputData/keys_1234567890ABCDEF.txt';
const _messagesFile = '../inputData/a-300.txt';
// const _messagesFile = '../inputData/sentences.txt';
// const _messagesFile = '../inputData/veryLargeSentences.txt';

const data = {
  keys: readText(_keysFile),
  messages: readText(_messagesFile),
};
var results = new ResultsDict();

const iLoopLength =
  typeof _keysLimit === 'undefined' ||
  _keysLimit === null ||
  _keysLimit > data.keys.length
    ? data.keys.length
    : _keysLimit;
const iMessageLength =
  typeof _messageLimit === 'undefined' ||
  _messageLimit === null ||
  _messageLimit > data.messages.length
    ? data.messages.length
    : _messageLimit;

for (let i = 0; i < iLoopLength; i++) {
  var key = data.keys[i];
  for (let j = 0; j < iMessageLength; j++) {
    const start = new Date();

    const message = data.messages[j];
    const messageHex = stringToCharHexArray(message);

    const cryptHex = Encrypt(messageHex, key, _numLoops);
    const receivedHex = Decrypt(cryptHex, key, _numLoops);

    const success = arrayEquals(messageHex, receivedHex);
    const exeTime = new Date() - start;

    console.log(success, i, j, '|', exeTime + ' ms');
    if (!success) throw new Error('encryption and decryption not successful');
    for (let m = 0; m < message.length; m++) {
      const char = message[m];
      const cryptCharHex = cryptHex[m];
      results.add(char, cryptCharHex);
    }
  }
}
