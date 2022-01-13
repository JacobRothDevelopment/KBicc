// const data = require('../inputs.json');
const { Encrypt, Decrypt } = require('../js/algorithms');
const {
  stringToCharHexArray,
  arrayEquals,
  readText,
  ConsoleOut,
} = require('../js/functions');
const { ResultsDict } = require('../js/ResultsDict');
const { _numLoops, _verbose } = require('../js/settings');

const _keysLimit = 10000;
const _messageLimit = 10;
const _keysFile = '../inputData/keys_1234567890ABCDEF.txt';
const _messagesFile = '../inputData/a-300.txt';
// const _messagesFile = '../inputData/sentences.txt';
// const _messagesFile = '../inputData/veryLargeSentences.txt';

const data = {
  keys: readText(_keysFile),
  messages: readText(_messagesFile),
};
var results = new ResultsDict();

var iKeysLength =
  typeof _keysLimit === 'undefined' ||
  _keysLimit === null ||
  _keysLimit > data.keys.length
    ? data.keys.length
    : _keysLimit;
var iMessagesLength =
  typeof _messageLimit === 'undefined' ||
  _messageLimit === null ||
  _messageLimit > data.messages.length
    ? data.messages.length
    : _messageLimit;

for (let i = 0; i < iKeysLength; i++) {
  var key = data.keys[i];
  for (let j = 0; j < iMessagesLength; j++) {
    var start = new Date();

    var message = data.messages[j];
    var messageHex = stringToCharHexArray(message);
    if (_verbose > 0) ConsoleOut('SUBMIT', messageHex);

    var cryptHex = Encrypt(messageHex, key);
    if (_verbose == 1) ConsoleOut('SENT', cryptHex);

    var receivedHex = Decrypt(cryptHex, key);
    if (_verbose == 1) ConsoleOut('RECEIVED', receivedHex);

    var success = arrayEquals(messageHex, receivedHex);
    var exeTime = new Date() - start;

    console.log(success, i, j, '|', exeTime + ' ms');
    if (!success) throw new Error('encryption and decryption not successful');
    for (let m = 0; m < message.length; m++) {
      var char = message[m];
      var cryptCharHex = cryptHex[2 * m] + cryptHex[2 * m + 1];
      results.add(char, cryptCharHex);
    }
  }
}

var differentHex = results.countHex('a');
var totalInstances = results.countInstances('a');
var missingHexes = results.missingKeys('a');

console.log('done');
