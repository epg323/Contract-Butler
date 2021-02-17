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
const getContractMarkets = require('./tasks/getContractMarkets.js');
const getLimits = require('./tasks/getLimits');
const getPairSupply = require("./tasks/getPairSupply");
//const {request} = require('graphql-request');

const scanMarket = async () => {
  // compare min and max price
  markets = await getContractMarkets(rpc,'mindswaplimt');
  limits = await getLimits(rpc,'mindswaplimt',markets)
  value = await getPairSupply(rpc,'mindswapswap', limits[0].token1, limits[0].token2, 100);
  console.log("1 IQ for ",value,limits[0].token2.sym)
  return markets
}

test = scanMarket()

schedule.scheduleJob('30 * * * * *', function(){
  console.log("Robo-scan 🤖📠")
});