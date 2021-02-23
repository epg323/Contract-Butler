const open = require("../actions/limit/open");
const transfer = require("../actions/limit/transfer");
const logger = require("../logger/log");
const executeOrders = require("./executeOrders");

const fulfillOrders = async(rpc,api,token1Contract,token1Sym,token2Contract,orderBalance,orderPrice,crtlmt)=>{
    open(api, 'mindswaplimt', 'bravocharlie',token1Contract,token1Sym,"bravocharlie")
    transfer(api, "mindswaplimt", token1Contract, "bravocharlie", orderBalance).catch(e => console.log(e));
    crtlmt(api, "mindswaplimt", "bravocharlie",token2Contract,token1Contract, orderPrice,orderBalance).then(data => {
        logger.info("limit order has been fufilled")
    }).then(data => {
        executeOrders(rpc,markets)
    });
};

module.exports = fulfillOrders;