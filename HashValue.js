'use strict';

function HashValue(tuple, validators, N, P){
  this.validators = validators;
  this.url = tuple[0];
  this.N = N;
  this.P = P;
  this.key = '';

  if(tuple[1] && validators){
    this.etag = tuple[1];
    this.key += this._encode(this.url);
    this.key += this._encode(this.etag);
  } else {
    this.key += this._encode(this.url);
    this.etag = null;
  }

  this.hash_value = '';
  this.hash_value += this._createHashValue(this.key, this.N, this.P);

  return this.hash_value;
}

HashValue.prototype._encode = function(encodee) {
  return encodeURIComponent(encodee).
    replace(/['()]/g, escape).
    replace(/\*/g, '%2A').
    replace(/%(?:7C|60|5E)/g, unescape);
};

HashValue.prototype._createHashValue = function(toHash, N, P){
  let shaObj = new jsSHA('SHA-256', 'TEXT');
  shaObj.update(toHash);
  let hash = shaObj.getHash('ARRAYBUFFER');
  let finHash = this._truncateHashValue(hash, N, P);

  return finHash;
};

HashValue.prototype._truncateHashValue = function(buffer, N, P){
  let thisBits = Math.log2(N * P);

  let dataview = new DataView(buffer);

  for(let i=0; i < buffer.byteLength; i++){
    dataview.setUint8(i, dataview.buffer[i]);
  }

  let f32bits = dataview.getUint32(0);
  let trunc = (f32bits & (Math.pow(2, thisBits)-1));

  return trunc;
};
