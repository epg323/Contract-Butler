const fillbuyord = require("../actions/limit/fillbuyord");
const { api } = require("../eosjs/api");
const getCurrencyBalance = require("../eosjs/getCurrencyBalance");
const getLimits = require("./getLimits");
const priceCompare = require("./priceCompare");
const crtlmtsell = require("../actions/limit/crtlmtsell")

const executeOrders = async (rpc,contract,limitList)=>{
    limits = await getLimits(rpc,'mindswaplimt',markets)
    ordersToExecute = await priceCompare(rpc,'mindswapswap',limits);
    console.log(ordersToExecute)
    if( ordersToExecute.BuysToExecute.length > 0 ){
        //buy
        const walletBalance = await getCurrencyBalance(rpc, ordersToExecute.BuysToExecute[0].token1Contract ,ordersToExecute.BuysToExecute[0].token1Sym)
        const balanceRequested = ordersToExecute.BuysToExecute[0].orderBalance;
        const walletBalanceAmt = parseInt(walletBalance[0].split(" ")[0],10);
        const balanceRequestedAmt = parseInt(balanceRequested.split(" ")[0],10);
        if(walletBalanceAmt>balanceRequestedAmt){
            console.log("we have enough money in our wallet")
            const {marketId, orderId} = ordersToExecute.BuysToExecute[0];
            console.log("here are some ids", ordersToExecute.BuysToExecute[0],marketId, orderId)
            crtlmtsell(api, "mindswaplimt", "bravocharlie", ordersToExecute.BuysToExecute[0].token1Contract, ordersToExecute.BuysToExecute[0].token2Contract, ordersToExecute.BuysToExecute[0].orderBalance, "1.000 YEMSWAP")
            //fillbuyord(api,"mindswaplimt", marketId, orderId).then(data => console.log("completed")).catch(e => console.log(e));
            // TODO: exhange tokens from mindswaswap action
            // TODO: after making exchange fulfill contract

            //executeorders()
        }else{
            console.log("need more funds in our wallet")
            // TODO: Get necessary funds to fulfill that order
            // TODO: verify that the exchange is worth it, might be too expensive to fufill that order
            //executeorders()
        }
    } else if(ordersToExecute.SalesToExecute.length > 0){
        //sell
    }else{
        console.log("No orders to execute, Contract Butler will go to sleep 😴")
    }
}

module.exports = executeOrders;