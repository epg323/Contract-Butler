const getCurrencyBalance = require("../eosjs/getCurrencyBalance");
const logger = require("../logger/log");

const balanceCheck = async (rpc, tokenContract, tokenTickr, orderBalance) => {
  const walletBalance = await getCurrencyBalance(
    rpc,
    tokenContract,
    tokenTickr
  );
  const balanceRequested = orderBalance;
  const walletBalanceAmt = parseInt(walletBalance[0].split(" ")[0], 10);
  const balanceRequestedAmt = parseInt(balanceRequested.split(" ")[0], 10);

  logger.info("This wallet has "+ walletBalanceAmt +" "+ tokenTickr + " and " + balanceRequestedAmt + " " + tokenTickr + " needs to be fufilled")
  
  return {
    walletBalanceAmt: walletBalanceAmt,
    balanceRequestedAmt: balanceRequestedAmt,
  };
};

module.exports = balanceCheck;
