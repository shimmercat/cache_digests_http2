'use strict';

var url;
var etag
var URLs = [[url, etag] = ['https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/anotherfolder/yetanotherfolder/andanother/bootstrap.min.css', 'W/"385b964b68acb68d23cb43a5218fade9"']];
var twoURLs = [[url, etag] = ['https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css', 'W/"385b964b68acb68d23cb43a5218fade9"'], [url, etag] = ['https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js', 'W/"abda843684d022f3bc22bc83927fe05f"']];

console.log(URLs.length);

// //--------------------------------------------------------
//
// function roundToNearestTwoPower(N){
//   return Math.pow(2,Math.floor(Math.log(N)/Math.log(2)));
// }
//
// let N = Math.floor((Math.random() * 100) + 1);
// console.log(N);
// var poweroftwo = roundToNearestTwoPower(N);
// console.log(poweroftwo);
//
// //--------------------------------------------------------

// letIABLES FOR TESTING PURPOSES AND TO SHOWCASE THE EXECUTION

let validators = true;

//--------------------END SHOWCASE-----------------------------

function HashValue(URLs, validators, N, P){
  console.log('THESE ARE THE TUPLES: ', URLs);
  console.time('URI Encode');
  this.url = URLs[0][0];
  console.log('THIS IS THE URL: ', this.url);
  this.key = this._encodeUrl(url);
  console.timeEnd('URI Encode');
  this.etag = URLs[0][1];
  this.validators = validators;

  if(this.validators && this.etag !== null){
    console.log('Executing etag & weakIndicator concat!');
    this.key += this._appendetag(this.etag);
    console.log('After concat: ', this.key);
  }

  this.SHA256 = this.SHA256(this.key);
  this.truncated = this._truncateHashValue(this.SHA256, N, P)

  this.N = N;
  this.P = P;
}

HashValue.prototype._encodeUrl = function(url) {
  return encodeURIComponent(url).
    replace(/['()]/g, escape).
    replace(/\*/g, '%2A').
    replace(/%(?:7C|60|5E)/g, unescape);
};

HashValue.prototype._appendetag = function(etag){
    let result = '';
    let asciietag = 'ETag: ' + etag;

    result = this._encodeUrl(asciietag);

    console.log('ETag------> ', result);

    return result;
};

HashValue.prototype.SHA256 = function(key){
  key = this._encodeUrl(key);

  function ROTR(n, x) {
    return (x >>> n) | (x << (32-n));
  }

  function Σ0(x) {
    return ROTR(2,  x) ^ ROTR(13, x) ^ ROTR(22, x);
  }

  function Σ1(x) {
    return ROTR(6,  x) ^ ROTR(11, x) ^ ROTR(25, x);
  }

  function σ0(x) {
    return ROTR(7,  x) ^ ROTR(18, x) ^ (x>>>3);
  }

  function σ1(x) {
    return ROTR(17, x) ^ ROTR(19, x) ^ (x>>>10);
  }

  function Ch(x, y, z) {
    return (x & y) ^ (~x & z);
  }

  function Maj(x, y, z) {
    return (x & y) ^ (x & z) ^ (y & z);
  }

  function toHexStr(n) {
    let s = '';
    let v = '';

    for (let i=7; i>=0; i--) {
      v = (n>>>(i*4)) & 0xf; s += v.toString(16);
    }

    return s;
  }

  let K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2 ];

    let H = [
      0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19
    ];

    key += String.fromCharCode(0x80);

    let l = key.length/4 + 2;
    let N = Math.ceil(l/16);
    let M = new Array(N);

    for (let i=0; i<N; i++) {
      M[i] = new Array(16);
      for (let j=0; j<16; j++) {
        M[i][j] = (key.charCodeAt(i*64+j*4)<<24) | (key.charCodeAt(i*64+j*4+1)<<16) | (key.charCodeAt(i*64+j*4+2)<<8) | (key.charCodeAt(i*64+j*4+3));
      }
    }

    M[N-1][14] = ((key.length-1)*8) / Math.pow(2, 32); M[N-1][14] = Math.floor(M[N-1][14]);
    M[N-1][15] = ((key.length-1)*8) & 0xffffffff;

    let W = new Array(64);
    let a, b, c, d, e, f, g, h;

    for (let i=0; i<N; i++) {

      for (let t=0;  t<16; t++) {
        W[t] = M[i][t];
      }

      for (let t=16; t<64; t++) {
        W[t] = (σ1(W[t-2]) + W[t-7] + σ0(W[t-15]) + W[t-16]) & 0xffffffff;
      }

      a = H[0]; b = H[1]; c = H[2]; d = H[3]; e = H[4]; f = H[5]; g = H[6]; h = H[7];

      for (let t=0; t<64; t++) {
        let T1 = h + Σ1(e) + Ch(e, f, g) + K[t] + W[t];
        let T2 =     Σ0(a) + Maj(a, b, c);
        h = g;
        g = f;
        f = e;
        e = (d + T1) & 0xffffffff;
        d = c;
        c = b;
        b = a;
        a = (T1 + T2) & 0xffffffff;
      }

      H[0] = (H[0]+a) & 0xffffffff;
      H[1] = (H[1]+b) & 0xffffffff;
      H[2] = (H[2]+c) & 0xffffffff;
      H[3] = (H[3]+d) & 0xffffffff;
      H[4] = (H[4]+e) & 0xffffffff;
      H[5] = (H[5]+f) & 0xffffffff;
      H[6] = (H[6]+g) & 0xffffffff;
      H[7] = (H[7]+h) & 0xffffffff;
    }

    var hex = '';

    hex += toHexStr(H[0]);
    hex += toHexStr(H[1]);
    hex += toHexStr(H[2]);
    hex += toHexStr(H[3]);
    hex += toHexStr(H[4]);
    hex += toHexStr(H[5]);
    hex += toHexStr(H[6]);
    hex += toHexStr(H[7]);

    console.log('SHA-256: ', hex);

    // return parseInt(hex, 16);
    return hex
};

HashValue.prototype._truncateHashValue = function(key, N, P){
  var P = 8;
  var N = 1;

  // var P = this.P;
  // var N = this.N;

  console.log('This key comes in: ', key);

  console.log(parseInt(key, 16));

  console.log('Converting key to integer: ', parseInt(key));

  var logarithm = Math.log2(N * P);
  return logarithm;
}

let testObject = new HashValue(URLs, etag, validators);

console.log(testObject);
