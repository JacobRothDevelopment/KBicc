const {
  Encrypt,
  Decrypt,
  stringToCharHexArray,
  charHexArrayToString,
} = require('./main');

var message = 'Hello World?';
var key = '1234567890987654321';

console.log(message);

var messageHex = stringToCharHexArray(message);
console.log(messageHex);

var encryptedMessageHex = Encrypt(messageHex, key);
console.log(encryptedMessageHex);

var decryptedMessageHex = Decrypt(encryptedMessageHex, key);
console.log(decryptedMessageHex);

console.log(charHexArrayToString(decryptedMessageHex));
