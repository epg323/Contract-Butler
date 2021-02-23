const { api } = require("../eosjs/api");
const getLimits = require("./getLimits");
const priceCompare = require("./priceCompare");
const crtlmtsell = require("../actions/limit/crtlmtsell")
const crtlmtbuy = require("../actions/limit/crtlmtbuy")
const balanceCheck = require("./balanceCheck");
const fulfillOrders = require("./fulfillOrders");

const executeOrders = async (rpc,markets)=>{
    const limits = await getLimits(rpc,'mindswaplimt',markets)
    const ordersToExecute = await priceCompare(rpc,'mindswapswap',limits);
    if( ordersToExecute.BuysToExecute.length > 0 ){
        const {token1Contract, token1tickr, token1Sym,token2Contract, orderBalance,orderPrice} = ordersToExecute.BuysToExecute[0]
        const {walletBalanceAmt,balanceRequestedAmt}=balanceCheck(rpc, token1Contract, token1tickr, orderBalance);
        if(walletBalanceAmt>balanceRequestedAmt){
            console.log("we have enough money in our wallet")
            fulfillOrders(api,token1Contract,token1Sym,token2Contract,orderBalance,orderPrice,crtlmtsell)
        }else{
            console.log("need more funds in our wallet")
            // TODO: Get necessary funds to fulfill that order
            // TODO: verify that the exchange is worth it, might be too expensive to fufill that order
            //executeorders()
        }
    } else if(ordersToExecute.SalesToExecute.length > 0){
        if( ordersToExecute.SalesToExecute.length > 0 ){
            const {token1Contract, token1tickr, token1Sym,token2Contract, orderBalance,orderPrice} = ordersToExecute.SalesToExecute[0]
            const {walletBalanceAmt,balanceRequestedAmt}=balanceCheck(rpc, token1Contract, token1tickr, orderBalance);
            if(walletBalanceAmt>balanceRequestedAmt){
                console.log("we have enough money in our wallet")
                fulfillOrders(api,token1Contract,token1Sym,token2Contract,orderBalance,orderPrice,crtlmtbuy)
            }else{
                console.log("need more funds in our wallet")
                // TODO: Get necessary funds to fulfill that order
                // TODO: verify that the exchange is worth it, might be too expensive to fufill that order
                //executeorders()
            }
        }
    }else{
        console.log("No orders to execute, Contract Butler will go to sleep 😴");
    }
}

module.exports = executeOrders;