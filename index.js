var crypto = require('crypto');
var n = shuffle(require("./n.json")),
p = shuffle(require("./p.json")),
m = shuffle(require("./m.json"));
var noms = require('noms');
var wordCache = '';
var ni = 0;
var pi, mi;
var nl = n.length;
var pl = p.length, ml = m.length;
pi = 0;
mi = 0;
module.exports = function () {
  return noms(function (next) {
    this.push(n[ni] + ' ' + p[pi] + ' ' + m[mi]);
    if (++ni === nl) {
      ni = 0;
      if (++pi === pl) {
        pi = 0;
        if (++mi === ml) {
          this.push(null);
        }
      }
    }
    next();
  });
};


function shuffle(array) {
  var counter = 0;
  var nums = crypto.randomBytes(array.length * 4);
  function randomValue(max) {
    var num = nums.readUInt32LE(counter)/0xffffffff;
    counter += 4;
    return ~~(max * num);
  }
  var i = array.length;
  var temp, randIndex;
  while (i) {
    randIndex = randomValue(i);
    i--;
    temp = array[i];
    array[i] = array[randIndex];
    array[randIndex] = temp;
  }
  return array;
}