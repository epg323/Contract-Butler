const { tokens } = require("../constants");
const logger = require("../logger/log");
const getPrice = require("./getPrice");

const priceCompare = async (rpc, contract, limits) => {
  const executeSell = [];
  const executeBuy = [];
  await Promise.all(
    limits.map(async (pair) => {
      const { id, token1, token2 } = pair;
      await Promise.all(
        pair.sellOrders.map(async (order) => {
          const { marketPrice, poolName, minAmt } = await getPrice(
            rpc,
            contract,
            token1,
            token2,
            order
          );
          const reqPrice = parseFloat(order.price.split(" ")[0]);
          const orderId = order.id;
          if (marketPrice && reqPrice && (marketPrice >= reqPrice) ) {
            logger.info(
              `Sell Order #${orderId} can be fulfilled. ${
                token2.sym.split(",")[1]
              } is ${marketPrice - reqPrice} above requested price.`
            );
            executeSell.push({
              marketId: id,
              orderId: orderId,
              orderBalance: order.balance,
              orderPrice: order.price,
              token1Sym: token1.sym,
              token1tickr: token1.sym.split(",")[1],
              token1Contract: token1.contract,
              token2Sym: token2.sym,
              token2tickr: token2.sym.split(",")[1],
              token2Contract: token2.contract,
              min_expected: minAmt.toString(),
              pool: poolName,
            });
          }
        })
      );
      await Promise.all(
        pair.buyOrders.map(async (order) => {
          const { marketPrice, poolName, minAmt } = await getPrice(
            rpc,
            contract,
            token1,
            token2,
            order
          );
          const reqPrice = parseFloat(order.price.split(" ")[0]);
          const orderId = order.id;
          if (marketPrice && reqPrice && (marketPrice <= reqPrice) ) {
            logger.info(
              `Buy Order #${orderId} can be fulfilled. ${
                token2.sym.split(",")[1]
              } is ${(reqPrice - marketPrice)} below requested price.`
            );
            executeBuy.push({
              marketId: id,
              orderId: orderId,
              orderBalance: order.balance,
              orderPrice: order.price,
              token1Sym: token1.sym,
              token1tickr: token1.sym.split(",")[1],
              token1Contract: token1.contract,
              token2Sym: token2.sym,
              token2tickr: token2.sym.split(",")[1],
              token2Contract: token2.contract,
              min_expected: minAmt.toString(),
              pool: poolName,
            });
          }
        })
      );
    })
  );

  return {
    SalesToExecute: executeSell,
    BuysToExecute: executeBuy,
  };
};

module.exports = priceCompare;
