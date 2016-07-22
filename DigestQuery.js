'use strict';

function DigestQuery(digest_value, tuples, validators, hash_values){
  // let DV = new DigestValue(validators, tuples, 32); // 32 is the value of P
  let DV = digest_value;
  console.log(DV);
  function getPow(start, bits){
    let powValue = 0;
    let power = 0;
    let fiveBits = [];

    for(let j = start; j < start + 5; j++){
      fiveBits.push(bits[j]);
    }

    if(fiveBits[0] === 1){
      power++;
    }

    for(let i = 1; i < 5; i++){
      if(fiveBits[i] === 1){
        power += i * 2;
      }
    }

    powValue = Math.pow(2, power);

    return powValue;
  }

  this.N = getPow(0, DV);
  this.P = getPow(5, DV);
  this.tuples = tuples;
  this.validators = validators;
  // let HV = this._loadHashValues(tuple, validators, N, P);
  let HV = this._loadHashes(this.tuples, this.validators, this.N, this.P)

  let C = -1;
  let matchFound;
  let indexOfDiscarded = 0;
  let Q = 0;

  // while(matchFound === undefined){
  //   for(let i = indexOfDiscarded; i < DV.length; i++){
  //     if(DV[i] === 0){
  //       Q += 1;
  //     } else {
  //       indexOfDiscarded = i;
  //       console.log('indexOfDiscarded: ', indexOfDiscarded);
  //       console.log('Value of Q: ', Q);
  //       break;
  //     }
  //     if(i === DV.length){
  //       matchFound = true;
  //     }
  //   }
  //   matchFound = true;
  //
  // }
  console.log(this);
}

DigestQuery.prototype._loadHashes = function(URLs, validators, N, P){
  let hV;
  let hVs = [];

  hVs.push(0);

  for (let i = 0; i < URLs.length; i++){
    hV = new HashValue(URLs[i], validators, N, P);
    hVs.push(Number(hV.hash_value));
  }

  hVs.sort(function(a, b){
    return a-b;
  });

  return hVs;
}

let testQueryValue = new DigestQuery(testDigestsValue.digest_value, URLs, validators, testDigestsValue.hash_values);
