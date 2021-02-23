const { api, rpc } = require("../eosjs/api");
const getLimits = require("./getLimits");
const priceCompare = require("./priceCompare");
const crtlmtsell = require("../actions/limit/crtlmtsell")
const crtlmtbuy = require("../actions/limit/crtlmtbuy")
const balanceCheck = require("./balanceCheck");
const fulfillOrders = require("./fulfillOrders");
const logger = require("../logger/log");

const executeOrders = async (rpc,markets)=>{
    const limits = await getLimits(rpc,'mindswaplimt',markets)
    const ordersToExecute = await priceCompare(rpc,'mindswapswap',limits);
    if( ordersToExecute.BuysToExecute.length > 0 ){
        const {token1Contract, token1tickr, token1Sym,token2Contract, orderBalance,orderPrice} = ordersToExecute.BuysToExecute[0]
        const {walletBalanceAmt,balanceRequestedAmt}=balanceCheck(rpc, token1Contract, token1tickr, orderBalance);
        if(walletBalanceAmt>balanceRequestedAmt){
            logger.info("we have enough money in our wallet")
            fulfillOrders(rpc,api,token1Contract,token1Sym,token2Contract,orderBalance,orderPrice,crtlmtsell)
        }else{
            logger.info(`need more funds in our wallet, we need ${balanceRequestedAmt-walletBalanceAmt}`)
            // TODO: Get necessary funds to fulfill that order
            // TODO: verify that the exchange is worth it, might be too expensive to fufill that order
            //executeorders()
        }
    } else if(ordersToExecute.SalesToExecute.length > 0){
            const {token1Contract, token1tickr, token1Sym,token2Contract, orderBalance,orderPrice} = ordersToExecute.SalesToExecute[0]
            const {walletBalanceAmt,balanceRequestedAmt}=await balanceCheck(rpc, token1Contract, token1tickr, orderBalance);
            if(walletBalanceAmt>balanceRequestedAmt){
                logger.info("we have enough money in our wallet")
                fulfillOrders(rpc,api,token1Contract,token1Sym,token2Contract,orderBalance,orderPrice,crtlmtbuy)
            }else{
                logger.info(`need more funds in our wallet, we need ${balanceRequestedAmt-walletBalanceAmt}`)
                // TODO: Get necessary funds to fulfill that order
                // TODO: verify that the exchange is worth it, might be too expensive to fufill that order
                //executeorders()
        }
    }else{
        console.log("No orders to execute, Contract Butler will go to sleep 😴");
    }
}

module.exports = executeOrders;