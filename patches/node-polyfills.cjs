'use strict';
// Preloader: polyfills removed Node.js APIs before firebase-admin loads.
// buffer-equal-constant-time@1.0.0 references SlowBuffer (removed in Node.js v22+).
// Aliasing SlowBuffer → Buffer is safe: both are Uint8Array-based, only the deprecated
// allocation API differed. The constant-time comparison logic works identically.
const bufferModule = require('buffer');
if (!bufferModule.SlowBuffer) {
  bufferModule.SlowBuffer = bufferModule.Buffer;
}
