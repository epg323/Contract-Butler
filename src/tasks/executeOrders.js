const { api, rpc } = require("../eosjs/api");
const getLimits = require("./getLimits");
const priceCompare = require("./priceCompare");
const crtlmtsell = require("../actions/limit/crtlmtsell");
const crtlmtbuy = require("../actions/limit/crtlmtbuy");
const balanceCheckForBuyOrder = require("./balanceCheckForBuyOrder");
const fulfillOrders = require("./fulfillOrders");
const logger = require("../logger/log");
const balanceCheckForSellOrder = require("./balanceCheckForSellOrder");

const executeOrders = async (rpc, markets) => {
  const swapContract = process.env.EXCHANGE_CONTRACT;
  const limits = await getLimits(rpc, process.env.LIMIT_CONTRACT, markets);
  const ordersToExecute = await priceCompare(rpc, swapContract, limits);
  if (ordersToExecute.BuysToExecute.length > 0) {
    const {
      marketId,
      orderId,
      token1Contract,
      token1tickr,
      token1Sym,
      token2Contract,
      token2tickr,
      orderBalance,
      orderPrice,
    } = ordersToExecute.BuysToExecute[0];
    const { walletBalanceAmt, balanceRequestedAmt } = await balanceCheckForBuyOrder(
      rpc,
      token1Contract,
      token1tickr,
      orderBalance
    );
    if (walletBalanceAmt > balanceRequestedAmt) {
      logger.info("Placing an order for " + orderBalance + " priced at " + orderPrice)
      fulfillOrders(
        rpc,
        api,
        token1Contract,
        token1Sym,
        token2Contract,
        orderBalance,
        orderPrice,
        crtlmtsell,
        markets,
        executeOrders
      );
    } else {
      logger.info(
        `This order is trying to trade ${token1tickr} for ${token2tickr}.Need more funds in our wallet to fill the order, we need ${
          balanceRequestedAmt - walletBalanceAmt
        }${token1tickr} to fulfill order number ${orderId} in market number ${marketId}`
      );
      return "Need more funds"
    }
  } else if (ordersToExecute.SalesToExecute.length > 0) {
    const {
      marketId,
      orderId,
      token1Sym,
      token1tickr,
      token1Contract,
      token2Sym,
      token2tickr,
      token2Contract,
      orderBalance,
      orderPrice,
    } = ordersToExecute.SalesToExecute[0];

    const { walletBalanceAmt, balanceRequestedAmt } = await balanceCheckForSellOrder(
      rpc,
      token2Contract,
      token2tickr,
      orderBalance,
      orderPrice
    );
    if (walletBalanceAmt > balanceRequestedAmt) {
      logger.info("Placing an order for " + orderBalance + " priced at " + orderPrice)
      fulfillOrders(
        rpc,
        api,
        token1Contract,
        token1Sym,
        token2Contract,
        orderBalance,
        orderPrice,
        crtlmtbuy,
        markets,
        executeOrders
      );
    } else {
      logger.info(
        `This order is trying to trade ${token2tickr} for  ${token1tickr}. Need more funds in our wallet to fill the order, we need ${
          balanceRequestedAmt - walletBalanceAmt
        } ${token2tickr} to fulfill order number ${orderId} in market number ${marketId}`
      );
      return "Need more funds"
    }
  } else {
    logger.info("No orders to execute, Contract Butler will go to sleep 😴");
    return "Done"
  }
};

module.exports = executeOrders;