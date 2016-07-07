'use strict';

/*
* INPUTS:
*   N - integer number of URL members
*/

const validators = true;
let URLs = [[url, ETag] = ['https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css', 'W/"385b964b68acb68d23cb43a5218fade9"'], [url, ETag] = ['https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js', 'W/"abda843684d022f3bc22bc83927fe05f"']];


function DigestValue(validators, URLs, P){
  //for tests uncomment the next lines
  let N = this._roundToNearestTwoPower(URLs.length);

  this.N = this.roundToNearestTwoPower(N);
  this.hashValues = [0];  //integer
}

DigestValue.prototype._roundToNearestTwoPower = function(N){
  return Math.pow(2,Math.floor(Math.log(N)/Math.log(2)));
};

DigestValue.prototype._loadHashValues = function(URLs)
