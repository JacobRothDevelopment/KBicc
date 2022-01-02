const data = require('../inputs.json');
const { Encrypt, Decrypt } = require('../js/algorithms');
const { stringToCharHexArray, arrayEquals } = require('../js/functions');
const { _numLoops } = require('../js/settings');

for (let i = 0; i < data.keys.length; i++) {
  var key = data.keys[i];
  for (let j = 0; j < data.strings.length; j++) {
    var message = data.strings[j];
    var messageHex = stringToCharHexArray(message);

    var cryptHex = Encrypt(messageHex, key, _numLoops);
    var receivedHex = Decrypt(cryptHex, key, _numLoops);

    var success = arrayEquals(messageHex, receivedHex);
    // var aa = Array.isArray(messageHex);
    // var bb = Array.isArray(receivedHex);
    // var cc = messageHex.length === receivedHex.length;
    // var dd = messageHex.every((val, index) => val === receivedHex[index]);

    // for (let index = 0; index < messageHex.length; index++) {
    //   var mi = messageHex[index];
    //   var ri = receivedHex[index];
    //   if (mi !== ri) {
    //     throw new Error();
    //   }
    // }

    console.log(success, i, j);
    if (!success) throw new Error('encryption and decryption not successful');
  }
}
