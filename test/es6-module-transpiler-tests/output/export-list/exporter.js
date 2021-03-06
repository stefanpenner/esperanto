'use strict';

exports.incr = incr;

var a = 1;
var b = 2;

function incr() {
  var c = a++; exports.a = a; // Capture `a++` to force us to use a temporary variable.
  b++, exports.b = b;
}

exports.a = a;
exports.b = b;