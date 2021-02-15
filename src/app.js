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
//const {request} = require('graphql-request');

schedule.scheduleJob('30 * * * * *', function(){
  getMarkets(rpc,'mindswaplimt').then(data => 
  {
    data.rows.forEach( element =>
      {
        const {id,token1,token2} = element;
        console.log(id,token1.sym.split(',')[1],token2.sym.split(',')[1])
        if( token1.sym.split(',')[1] !== "IQ"){
          const foundToken = tokens.find( element => element.name === token1.sym.split(',')[1]);
          foundToken ? getSupply(rpc,'mindswapswap', foundToken.allowedTrades[0].pool).then(data => console.log(data)): console.log("nothing");
        }else{
          const foundToken = tokens.find( element => element.name === token2.sym.split(',')[1]);
          foundToken ? getSupply(rpc,'mindswapswap', foundToken.allowedTrades[0].pool).then(data => console.log(data)): console.log("nothing");
        }
        getSellOrders(rpc,'mindswaplimt',id ).then(data => console.log(data.rows))
        getBuyOrders(rpc, 'mindswaplimt', id).then(data => console.log(data.rows))
      });
  })
});