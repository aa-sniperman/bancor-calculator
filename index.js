// giả định giá Metis là 40
// khác với amm khi total supply ngay từ đầu đã cố định 800M, lượng total supply của bonding curve sẽ tăng / giảm mỗi lần buy/sell

function calculatePrice(P, S, invCw) {
  // giá = (real metis + virtual metis) / (collateral ratio * (total supply + virtual supply))
  return 40 * (P * invCw) / S
}

// S: đại diện cho lượng token
// P: đại diện cho lượng metis

function main() {

  // cw: collateral ratio = tỉ lệ giữa market cap / lượng metis có trong pool (đã tính cả lượng virtual)
  const invCw = 15;
  const n = invCw - 1;

  const cw = 1 / invCw;

  // dP: lượng metis muốn raise
  const dP = 250;

  // dS: lượng token muốn bán bond
  const dS = 8e8;

  // listingS: lượng token muốn
  const listingS = 1e9 - dS;

  // targetPriceRatio: lượng chênh lệch giá đầu giá cuối của bonding curve
  const targetPriceRatio = 16;

  // s0 = virtual supply
  const s0 = dS / (targetPriceRatio ** (1 / n) - 1);

  console.log('s0: ', s0);

  // virtual supply + total supply tại giai đoạn kết thúc bonding curve
  const sFinal = s0 + dS;

  console.log('-------------------Parameterization------------------');
  const div = 1 - (1 - dS / sFinal) ** invCw;
  console.log(div)
  const p0 = dP / div - dP;

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
  const p1 = dP;

  // công thức tính token out dựa vào lượng metis in, total metis trong pool hiện tại, total supply hiện tại
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