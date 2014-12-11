var fs = require('fs');
var through2 = require("through2");
var split2 = require("split2");
var n = require("./n.json"), p = require("./p.json"), m=require("./m.json");
var noms = require('noms');
var wordCache = '';
var ni = 0;
var pi, mi;
var nl = n.length;
var pl = p.length, ml = m.length;
pi = 0;
mi = 0;
noms(function (next) {
  this.push(n[ni] + ' ' + p[pi] + ' ' + m[mi]);
  if (++mi === ml) {
    mi = 0;
    if (++pi === pl) {
      pi = 0;
      if (++ni === nl) {
        this.push(null);
      }
    }
  }
  next();
}).pipe(through2(function (chunk, _, next) {
  this.push(chunk);
  console.log(chunk.toString());
  this.push('\n');
  next();
}, function (done) {
  done();
  console.log('done');
})).pipe(fs.createWriteStream('./npm.txt'));