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
      newDict[key] = 1;
      this.map[key] = newDict;
    }
  }
}

module.exports = {
  ResultsDict,
};
