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

  function getR(array){
    let retInt = 0;

    for(let i = 0; i < array.length; i++){
      if(array[i] === 1){
        retInt += i * 2;
      }
    }

    return retInt;
  }

  this.N = getPow(0, DV);
  this.P = getPow(5, DV);
  this.tuples = tuples;
  this.validators = validators;
  // let HV = this._loadHashValues(tuple, validators, N, P);
  let HV = this._loadHashes(this.tuples, this.validators, this.N, this.P);

  let C = -1;
  let matchFound;
  let indexOfDiscarded = 0;

  while(matchFound === undefined){
    console.log(indexOfDiscarded);
    for(let i = indexOfDiscarded; i < DV.length; i++){
      let Q = 0;

      if(DV[i] === 0){
        Q += 1;
      } else {
        indexOfDiscarded = i;
        //reading the digest-value - R = integer
        let readTo = Math.log2(this.P);
        let bitsArray = [];
        for(let x = indexOfDiscarded + 1; x <= readTo; x++){
          bitsArray.push(DV[x]);
        }
        let R = getR(bitsArray);
        let D = (Q * this.P) + R;
        C += D + 1;

        if( C === HV){
          matchFound = true;
        }
      }
      if(i === DV.length - 1 && matchFound === undefined){
        matchFound = false;
      }
    }
    this.matchFound = matchFound;
  }

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
