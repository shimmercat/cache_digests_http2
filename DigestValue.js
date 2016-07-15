'use strict';

/*
* INPUTS:
*   N - integer number of URL members
*/

const validators = true;
const P = 32; // 2 power of 5

let url;
let etag;

let URLs = [
  [url, etag] = ['http://localhost:1337/test.js', 'W/"385b964b68acb68d23cb43a5218fade9"'],
  [url, etag] = ['https://localhost:443/testFolder/main.css', 'W/"385b964b68a5248d23cb43a5218fade9"'],
  [url, etag] = ['https://code.jquery.com/jquery-3.1.0.js', 'W/"385b964b68acb68d23cb43a5218adef9"'],
  [url, etag] = ['https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/4/bootstrap.min.css']
];

function DigestValue(validators, URLs, P){
  this.validators = validators;
  this.URLs = URLs;
  this.P = P;
  this.N = this._roundToNearestTwoPower(this.URLs.length);
  this.hash_values = this._loadHashValues(this.URLs, this.validators, this.N, this.P);
  this.digest_value = new ArrayBuffer(this.URLs.length);

  return this;
}

DigestValue.prototype._roundToNearestTwoPower = function(N){
  return Math.pow(2,Math.floor(Math.log(N)/Math.log(2)));
};

DigestValue.prototype._loadHashValues = function(URLs, validators, N, P){
  let hashValue;
  let hashValues = [];

  hashValues.push(0);

  for (let i = 0; i < URLs.length; i++){
    hashValue = new HashValue(URLs[i], validators, N, P);
    hashValues.push(Number(hashValue.hash_value));
  }

  hashValues.sort(function(a, b){
    return a-b;
  });

  return hashValues;
};

let testDigestsValue = new DigestValue(validators, URLs, P);

console.time('test');
console.log(testDigestsValue);
console.timeEnd('test');
