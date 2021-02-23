require("dotenv").config();
global.fetch = require("node-fetch");
global.WebSocket = require("ws");
const { api, rpc } = require("./eosjs/api");
const logger = require('./logger/log');
const schedule = require('node-schedule');
const getContractMarkets = require('./tasks/getContractMarkets.js');
const executeOrders = require("./tasks/executeOrders");

const scanMarket = async () => {
  const markets = await getContractMarkets(rpc,'mindswaplimt');
  executeOrders(rpc, markets)
}

schedule.scheduleJob('30 * * * * *', function(){
  console.log("Robo-MarketScan 🤖📠")
  scanMarket()
});