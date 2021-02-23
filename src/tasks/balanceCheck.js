const getCurrencyBalance = require("../eosjs/getCurrencyBalance");

const balanceCheck = async(rpc, token1Contract, token1tickr, orderBalance)=>{
    const walletBalance = await getCurrencyBalance(rpc, token1Contract ,token1tickr)
    const balanceRequested = orderBalance;
    const walletBalanceAmt = parseInt(walletBalance[0].split(" ")[0],10);
    const balanceRequestedAmt = parseInt(balanceRequested.split(" ")[0],10);    

    return {walletBalanceAmt:walletBalanceAmt, balanceRequestedAmt:balanceRequestedAmt}
}
  
module.exports = balanceCheck;