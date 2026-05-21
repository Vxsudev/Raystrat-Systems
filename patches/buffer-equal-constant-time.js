'use strict';
// Polyfill for buffer-equal-constant-time v1.0.0 which references SlowBuffer,
// removed in Node.js v22+. Preserves the full API surface (bufferEq, install, restore).
var Buffer = require('buffer').Buffer;

function bufferEq(a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) return false;
  if (a.length !== b.length) return false;
  var c = 0;
  for (var i = 0; i < a.length; i++) c |= a[i] ^ b[i];
  return c === 0;
}

var origBufEqual = Buffer.prototype.equal;
bufferEq.install = function () {
  Buffer.prototype.equal = function equal(that) { return bufferEq(this, that); };
};
bufferEq.restore = function () {
  Buffer.prototype.equal = origBufEqual;
};

module.exports = bufferEq;
