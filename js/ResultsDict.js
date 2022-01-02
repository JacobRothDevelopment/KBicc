class ResultsDict {
  constructor() {
    /** 
    Dictionary:
    key = (string) character;
    val = (string[]) array of output characters after encryption;
    */
    this.map = {};
  }

  add(key, val) {
    if (key in this.map) {
      /** @var t  */
      var t = this.map[key];
      t.push(val);
      this.map[key] = t;
    } else {
      this.map[key] = [val];
    }
  }
}

module.exports = {
  ResultsDict,
};
