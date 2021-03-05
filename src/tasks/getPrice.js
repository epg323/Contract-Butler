const { asset, number_to_asset: numberToAsset } = require("eos-common");
const { tokens } = require("../constants");
const { getSupply } = require("../eosjs/getBlock");
const logger = require("../logger/log");

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
        const supply1 = asset(data.rows[0].pool1.quantity);
        const supply2 = asset(data.rows[0].pool2.quantity);
        const fee = data.rows[0].fee;
        return { token1: supply1, token2: supply2, fee: fee };
      })
      .then(async (obj) => {
        const value = computeForward(
          asset(qtyBuy * -1, obj.token1.symbol).amount,
          obj.token2.amount,
          obj.token1.amount.add(qtyBuy),
          obj.fee
        );
        marketPrice = Math.abs(value)/qtyBuy
        marketPrice = marketPrice.toPrecision(parseInt(obj.token1.symbol.toString().split(",")[0],10)+1);
        logger.info("Attempting to buy "+qtyBuy+" the market price for "+ obj.token1.symbol.toString().split(",")[1]+ " -> "+ obj.token1.symbol.toString().split(",")[1] +" is "+marketPrice +obj.token1.symbol.toString().split(",")[1])
        poolName = pool;
        minAmt = asset(
          marketPrice *
            Math.pow(10, obj.token2.symbol.toString().split(",")[0]),
          obj.token2.symbol
        );
      });
  } else {
    logger.error(`pool for pair,(${sym1} ${sym2}),not found`);
  }
  return { marketPrice, poolName, minAmt };
};

const computeForward = (x, y, z, fee) => {
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
};

module.exports = getPrice;
