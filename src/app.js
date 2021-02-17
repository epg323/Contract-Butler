require("dotenv").config();
global.fetch = require("node-fetch");
global.WebSocket = require("ws");
const { dfuseClient, createDfuseClient } = require("@dfuse/client");
const { api, rpc } = require("./eosjs/api");
const { getBlock, getAccount, getCode, getTransfers, getSupply, getSellOrders, getMarkets, getBuyOrders } = require("./eosjs/getBlock");
const { open, close, crtlmtbuy, crtlmtsell, transfer, clslmtbuy, clslmtsell, withdraw } = require("./actions");
const { DFUSE_API_KEY, DFUSE_NETWORK } = process.env;
const {tokens, balances} = require("./constants/index");
const logger = require('./logger/log');
const schedule = require('node-schedule');
const asset = require('eos-common')
//const {request} = require('graphql-request');

schedule.scheduleJob('30 * * * * *', function(){
  let supply1 ,supply2;
  getMarkets(rpc,'mindswaplimt').then(data => 
  {
    data.rows.forEach( element =>
      {
        const {id,token1,token2} = element;
        console.log(id,token1.sym.split(',')[1],token2.sym.split(',')[1])

        if( token1.sym.split(',')[1] !== "IQ"){
          const foundToken = tokens.find( element => element.name === token1.sym.split(',')[1]);
          foundToken ? getSupply(rpc,'mindswapswap', foundToken.allowedTrades[0].pool).then((data) => { 
            console.log(data.rows[0].pool1.quantity.split(' ')[1])
            supply1 = asset.asset(data.rows[0].pool1.quantity)
            supply2 = asset.asset(data.rows[0].pool2.quantity)
            return {token1:supply1,token2:supply2}
        }).then( obj => {
            console.log("here is my obj", obj)
            const value = calc(1, parseInt(obj.token1,10), parseInt(obj.token2,10))
            console.log(value)
          }): console.log("nothing");
        }else{
          const foundToken = tokens.find( element => element.name === token2.sym.split(',')[1]);
          foundToken ? getSupply(rpc,'mindswapswap', foundToken.allowedTrades[0].pool).then((data) => { 
            console.log(data.rows[0].pool1.quantity.split(' ')[1])
            supply1 = asset.asset(data.rows[0].pool1.quantity)
            supply2 = asset.asset(data.rows[0].pool2.quantity)
            return {token1:supply1,token2:supply2}
        }).then(async (obj) => {
          console.log("here is my obj", obj)
          const value = await calc(asset.asset(10,obj.token2.symbol).amount, obj.token1.amount, obj.token2.amount.add(10),0)
          console.log(value.toString(), obj.token1.symbol.toString())
        }): console.log("nothing");
        }
        
        getSellOrders(rpc,'mindswaplimt',id )//.then(data => console.log(data.rows))
        getBuyOrders(rpc, 'mindswaplimt', id)//.then(data => console.log(data.rows))
      });
  })
});

const calc = async function(x,y,z,fee) {
  console.log("inside calc", x ,y,z)
  const prod = x.multiply(y);
  let tmp;
  let tmpFee;
  console.log(prod)
  if (x > 0) {
    tmp = prod.minus(1).divide(z).plus(1);
    tmpFee = tmp.multiply(fee).plus(9999).divide(10000);
  } else {
    tmp = prod.divide(z);
    tmpFee = tmp.multiply(-1).multiply(fee).plus(9999).divide(10000);
  }

  return tmp
    .plus(tmpFee)
    //.multiply(100 - slippage)
    //.divide(100);
}