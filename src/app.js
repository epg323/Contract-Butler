require("dotenv").config();
global.fetch = require("node-fetch");
global.WebSocket = require("ws");
const { dfuseClient, createDfuseClient } = require("@dfuse/client");
const { api, rpc } = require("./eosjs/api");
const { getBlock, getAccount, getCode, getTransfers, getSupply, getSellOrders, getMarkets, getBuyOrders } = require("./eosjs/getBlock");
const { DFUSE_API_KEY, DFUSE_NETWORK } = process.env;
const {tokens, balances} = require("./constants/index");
const logger = require('./logger/log');
const schedule = require('node-schedule');
const asset = require('eos-common')
const getContractMarkets = require('./tasks/getContractMarkets.js');
const getLimits = require('./tasks/getLimits');
const getPrice = require("./tasks/getPrice");
const priceCompare = require("./tasks/priceCompare");
const getCurrencyBalance = require("./eosjs/getCurrencyBalance");
const executeOrders = require("./tasks/executeOrders");
//const {request} = require('graphql-request');
const open = require("./actions/arbitrage/open");
const transfer = require("./actions/limit/transfer");
const crtlmtsell = require("./actions/limit/crtlmtsell");
const arbordtrade = require("./actions/arbitrage/arbordtrade")
const validate = require("./actions/arbitrage/validate")

open(api, 'mindswaplimt', 'bravocharlie',"everipediaiq","3,IQ","bravocharlie")
transfer(api, "mindswaplimt", "everipediaiq", "bravocharlie", "1.000 IQ").catch(e => console.log(e));
crtlmtsell(api, "mindswaplimt", "bravocharlie",  "prediqtokens","everipediaiq","0.500 YEMSWAP", "1.000 IQ");

const scanMarket = async () => {
  // compare min and max price
  const markets = await getContractMarkets(rpc,'mindswaplimt');
  //limits = await getLimits(rpc,'mindswaplimt',markets)
  //ordersToExecute = await priceCompare(rpc,'mindswapswap',limits);
  //getCurrencyBalance(rpc, "everipediaiq","IQ").then(data => console.log(data)).catch(e => console.log(e))
  executeOrders(rpc, markets) // TODO: add more inputs
  return markets
}


schedule.scheduleJob('30 * * * * *', function(){
  console.log("Robo-scan 🤖📠")
  scanMarket()
});