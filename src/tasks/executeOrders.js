const fillbuyord = require("../actions/limit/fillbuyord");
const { api } = require("../eosjs/api");
const getCurrencyBalance = require("../eosjs/getCurrencyBalance");
const getLimits = require("./getLimits");
const priceCompare = require("./priceCompare");
const crtlmtsell = require("../actions/limit/crtlmtsell")
const crtlmtbuy = require("../actions/limit/crtlmtbuy")
const open = require("../actions/limit/open")
const transfer = require("../actions/limit/transfer")

const executeOrders = async (rpc,markets,contract,limitList)=>{
    const limits = await getLimits(rpc,'mindswaplimt',markets)
    const ordersToExecute = await priceCompare(rpc,'mindswapswap',limits);
    //console.log(ordersToExecute)
    if( ordersToExecute.BuysToExecute.length > 0 ){
        //buy
        const walletBalance = await getCurrencyBalance(rpc, ordersToExecute.BuysToExecute[0].token1Contract ,ordersToExecute.BuysToExecute[0].token1tickr)
        const balanceRequested = ordersToExecute.BuysToExecute[0].orderBalance;
        const walletBalanceAmt = parseInt(walletBalance[0].split(" ")[0],10);
        const balanceRequestedAmt = parseInt(balanceRequested.split(" ")[0],10);
        if(walletBalanceAmt>balanceRequestedAmt){
            console.log("we have enough money in our wallet")
            open(api, 'mindswaplimt', 'bravocharlie',ordersToExecute.BuysToExecute[0].token1Contract,ordersToExecute.BuysToExecute[0].token1Sym,"bravocharlie")
            transfer(api, "mindswaplimt", ordersToExecute.BuysToExecute[0].token1Contract, "bravocharlie", ordersToExecute.BuysToExecute[0].orderBalance).catch(e => console.log(e));
            crtlmtsell(api, "mindswaplimt", "bravocharlie", ordersToExecute.BuysToExecute[0].token2Contract,ordersToExecute.BuysToExecute[0].token1Contract,  ordersToExecute.BuysToExecute[0].orderPrice,ordersToExecute.BuysToExecute[0].orderBalance).then(data => {
                console.log("limit order is being fufilled")
            }).then(data => {
                executeOrders(rpc,markets)
            });
        }else{
            console.log("need more funds in our wallet")
            // TODO: Get necessary funds to fulfill that order
            // TODO: verify that the exchange is worth it, might be too expensive to fufill that order
            //executeorders()
        }
    } else if(ordersToExecute.SalesToExecute.length > 0){
        console.log("ready to sell")
        //sell
        if( ordersToExecute.SalesToExecute.length > 0 ){
            //buy
            const walletBalance = await getCurrencyBalance(rpc, ordersToExecute.SalesToExecute[0].token1Contract ,ordersToExecute.SalesToExecute[0].token1tickr)
            const balanceRequested = ordersToExecute.SalesToExecute[0].orderBalance;
            const walletBalanceAmt = parseInt(walletBalance[0].split(" ")[0],10);
            const balanceRequestedAmt = parseInt(balanceRequested.split(" ")[0],10);
            if(walletBalanceAmt>balanceRequestedAmt){
                console.log("we have enough money in our wallet")
                open(api, 'mindswaplimt', 'bravocharlie',ordersToExecute.SalesToExecute[0].token1Contract,ordersToExecute.SalesToExecute[0].token1Sym,"bravocharlie")
                transfer(api, "mindswaplimt", ordersToExecute.SalesToExecute[0].token1Contract, "bravocharlie", ordersToExecute.SalesToExecute[0].orderBalance).catch(e => console.log(e));
                crtlmtbuy(api, "mindswaplimt", "bravocharlie", ordersToExecute.SalesToExecute[0].token2Contract,ordersToExecute.SalesToExecute[0].token1Contract,  ordersToExecute.SalesToExecute[0].orderPrice,ordersToExecute.SalesToExecute[0].orderBalance).then(data => {
                    console.log("limit order has been fufilled")
                }).then(data => {
                    executeOrders(rpc,markets)
                });

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