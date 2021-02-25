const open = require("../actions/limit/open");
const transfer = require("../actions/limit/transfer");
const logger = require("../logger/log");
const executeOrders = require("./executeOrders");

const fulfillOrders = async (
  rpc,
  api,
  token1Contract,
  token1Sym,
  token2Contract,
  orderBalance,
  orderPrice,
  crtlmt,
  markets,
  executeOrders
) => {
  const butlerWallet = process.env.BOT_WALLET_KYLIN;
  const limtContract = process.env.LIMIT_CONTRACT;
  open(
    api,
    limtContract,
    butlerWallet,
    token1Contract,
    token1Sym,
    butlerWallet
  );
  transfer(
    api,
    limtContract,
    token1Contract,
    butlerWallet,
    orderBalance
  ).catch((e) => console.log(e));
  crtlmt(
    api,
    limtContract,
    butlerWallet,
    token2Contract,
    token1Contract,
    orderPrice,
    orderBalance
  )
    .then((data) => {
      logger.info("limit order has been fufilled");
    })
    .then((data) => {
      executeOrders(rpc, markets);
    });
};

module.exports = fulfillOrders;
