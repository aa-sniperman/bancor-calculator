function calculatePrice(P, S, invCw) {
  return 40 * (P * invCw) / S
}

function main() {

  const invCw = 30;
  const n = invCw - 1;

  const cw = 1 / invCw;

  const dP = 250;
  const dS = 8e8;
  const listingS = 1e9 - dS;
  const s0 = dS / (40 ** (1 / n) - 1);
  console.log('s0: ', s0);
  const sFinal = s0 + dS;

  console.log('-------------------Parameterization------------------');
  const div = 1 - (1 - dS / sFinal) ** invCw;

  console.log(div)
  const p0 = dP / div - dP;


  const P = dP + p0;
  const S = dS + s0;

  // const m = P / (cw * (S ** invCw));

  console.log('cw: ', cw);
  // console.log('m: ', m * 1e36);
  console.log('dP: ', dP);
  console.log('dS: ', dS);
  console.log('s0: ', s0);
  console.log('p0: ', p0);

  console.log('--------------First buy simulation----------------');

  const initialPrice = calculatePrice(p0, s0, invCw);
  console.log('Initial price: ', initialPrice);
  console.log('Initial MC: ', 1e9 * initialPrice)
  const p1 = 250;
  const s1 = s0 * ((1 + p1 / p0) ** cw) - s0;
  const price = calculatePrice(p1 + p0, s1 + s0, invCw);
  console.log('Price After: ', price);
  console.log('Final cap: ', 1e9 * price)
  console.log('Price ratio: ', price / initialPrice);
  console.log('BC progress: ', 100 * s1 / dS);
  console.log('Listing price: ', 40 * dP * 0.92 / listingS)
  console.log('Listing token: ', listingS);
  console.log('Bonded token: ', s1);
}

main();