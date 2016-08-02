'use strict';

function DigestQuery(digest_value, tuples, validators, hash_values){
  let DV = digest_value;

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

  function calcInt(bitArray){
    let count = bitArray.length;
    let returnInt = 0;

    for(let c = 0; c < count; c++){
      if(bitArray[c] === 1)
      returnInt += Math.pow(2, c);
    }

    return returnInt;
  }

  this.N = getPow(0, DV);
  this.P = getPow(5, DV);
  this.tuples = tuples;
  this.validators = validators;

  let HV = this._loadHashes(this.tuples, this.validators, this.N, this.P)

  let matchFound;
  let indexOfDiscarded = 0;

  while(matchFound === undefined){

    let Q = 0;
    for(let i = indexOfDiscarded; i < DV.length; i++){
      if(DV[i] === 0){
        Q += 1;
      } else {
        indexOfDiscarded = i;

        let startBit = i + 1;
        let readLength = Math.log2(P);
        let tempArray = [];

        for(let temp = 0; temp < readLength; temp++){
          tempArray.push(DV[startBit]);
          startBit++;
        }

        let C = -1;
        let R = calcInt(tempArray);
        let D = Q * P + R;

        C += D + 1;
        Q = 0;

        for(let hvCount = 0; hvCount < HV.length; hvCount++){
          if(C == HV[hvCount]){
            matchFound = true;
          }
        }
      }

      if(i === DV.length - 1 && !matchFound){
        matchFound = false;
      }
    }
    break;
  }
  this.matched = matchFound;
  console.log(this);
  return this;
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
};

let testQueryValue = new DigestQuery(testDigestsValue.digest_value, URLs, validators, testDigestsValue.hash_values);
