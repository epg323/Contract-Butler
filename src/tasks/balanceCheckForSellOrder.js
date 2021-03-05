const getCurrencyBalance = require("../eosjs/getCurrencyBalance");
const logger = require("../logger/log");

const balanceCheckForSellOrder = async (rpc, tokenContract, tokenTickr, orderBalance, orderPrice) => {
  const walletBalance = await getCurrencyBalance(
    rpc,
    tokenContract,
    tokenTickr
  );
  const formattedOrderBalance = parseFloat(orderBalance.split(" ")[0])
  const formattedOrderPrice = parseFloat(orderPrice.split(" ")[0])
  const amountToFufill = formattedOrderBalance * formattedOrderPrice;
  const walletBalanceAmt = parseInt(walletBalance[0].split(" ")[0], 10);

  logger.info("This wallet has "+ walletBalanceAmt +" "+ tokenTickr + " and " + amountToFufill + " " + tokenTickr + " needs to be fufilled")
  
  return {
    walletBalanceAmt: walletBalanceAmt,
    balanceRequestedAmt: amountToFufill,
  };
};

module.exports = balanceCheckForSellOrder;
