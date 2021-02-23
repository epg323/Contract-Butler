const { asset } = require("eos-common");
const { tokens } = require("../constants");
const { getSupply } = require("../eosjs/getBlock");

const getPrice = async (rpc, contract, token1, token2, order) => {
  let foundPair, marketPrice, poolName, minAmt;
  const sym1 = token1.sym.split(",")[1];
  const sym2 = token2.sym.split(",")[1];
  const qtyBuy = parseFloat(order.volume.split(" ")[0]) * 10000;

  if (sym1 !== "IQ") {
    foundPair = tokens.find((element) => element.name === sym1);
  } else {
    foundPair = tokens.find((element) => element.name === sym2);
  }

  if (foundPair) {
    const pool = foundPair.allowedTrades[0].pool;
    await getSupply(rpc, contract, pool)
      .then((data) => {
        supply1 = asset(data.rows[0].pool1.quantity);
        supply2 = asset(data.rows[0].pool2.quantity);
        return { token1: supply1, token2: supply2 };
      })
      .then(async (obj) => {
        let value = await calc(
          asset(qtyBuy, obj.token2.symbol).amount,
          obj.token1.amount,
          obj.token2.amount.add(qtyBuy),
          0
        );
        value = value.toString();
        marketPrice = qtyBuy / value; // TODO: verify this calculation
        poolName = pool;
        minAmt = asset(
          marketPrice *
            Math.pow(10, obj.token1.symbol.toString().split(",")[0]),
          obj.token1.symbol
        );
      });
  } else {
    console.log(`pool for pair,(${sym1} ${sym2}),not found`);
  }
  return { marketPrice, poolName, minAmt };
};

const calc = async function (x, y, z, fee) {
  const prod = x.multiply(y);
  let tmp;
  let tmpFee;
  if (x > 0) {
    tmp = prod.minus(1).divide(z).plus(1);
    tmpFee = tmp.multiply(fee).plus(9999).divide(10000);
  } else {
    tmp = prod.divide(z);
    tmpFee = tmp.multiply(-1).multiply(fee).plus(9999).divide(10000);
  }

  return tmp.plus(tmpFee);
  //.multiply(100 - slippage)
  //.divide(100);
};

module.exports = getPrice;
