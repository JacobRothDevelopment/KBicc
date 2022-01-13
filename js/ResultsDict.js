const {
  _numPartBytes,
  _numPartBits,
  _numBytes,
  _numBits,
} = require('../js/settings');
const { ConsoleOut } = require('./functions');

class ResultsDict {
  constructor() {
    /** 
    Dictionary<string, Dictionary<string, int>>;
    string 1 => string char
    string 2 => string 
    */
    this.map = {};
  }

  add(key, val) {
    if (key in this.map) {
      var d = this.map[key]; // Dictionary<string, int>
      if (val in d) {
        var count = d[val];
        d[val] = count + 1;
      } else {
        d[val] = 1;
      }
      this.map[key] = d;
    } else {
      var newDict = {};
      newDict[val] = 1;
      this.map[key] = newDict;
    }
  }

  missingKeys(char) {
    var hexes = [];
    for (let i = 0; i < 2 ** _numBits; i++) {
      var hex = i.toString(16).padStart(_numBytes, '0');
      if (this.map[char][hex] == undefined) {
        // ConsoleOut('missing', hex);
        hexes.push(hex);
      }
    }
    return hexes;
  }

  countInstances(char) {
    var count = 0;
    for (let hex in this.map[char]) {
      count += this.map[char][hex];
    }
    return count;
  }

  countHex(char) {
    var count = 0;
    for (let hex in this.map[char]) {
      count += 1;
    }
    return count;
  }
}

module.exports = {
  ResultsDict,
};
