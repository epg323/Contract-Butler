require("dotenv").config();
global.fetch = require("node-fetch");
global.WebSocket = require("ws");
const { dfuseClient, createDfuseClient } = require("@dfuse/client");
const { api, rpc } = require("./eosjs/api");
const { getBlock, getAccount, getCode, getTransfers, getSupply, getSellOrders, getMarkets } = require("./eosjs/getBlock");
const { open, close, crtlmtbuy, crtlmtsell, transfer, clslmtbuy, clslmtsell, withdraw } = require("./actions");
const { DFUSE_API_KEY, DFUSE_NETWORK } = process.env;
const {tokens, balances} = require("./constants/index");
const logger = require('./logger/log');
const schedule = require('node-schedule');
//const {request} = require('graphql-request');

let oldMarket, newMarket;
oldMarket = newMarket = 0;

schedule.scheduleJob('30 * * * * *', function(){
  getMarkets(rpc,'mindswaplimt').then(data => 
  {
    newMarket = data.rows.length
    logger.info(`Lengths are ${newMarket}, and ${oldMarket}`)
    if(oldMarket !== newMarket){
      logger.info("New markets are in! Contract-Butler is on it 🦾🧐")
      logger.info(data.rows)
      oldMarket = newMarket;
    }else{
      logger.info("Nothing new so far 😴")
      oldMarket = newMarket;
    }
  })
});

module.exports = dfuseClient;
