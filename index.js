var shuffle = require('knuth-shuffle').knuthShuffle;
var n = shuffle(require("./n.json")), p = shuffle(require("./p.json")), m=shuffle(require("./m.json"));
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