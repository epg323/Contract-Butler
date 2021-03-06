require("dotenv").config();
global.fetch = require("node-fetch");
global.WebSocket = require("ws");
const { api, rpc } = require("./eosjs/api");
const logger = require("./logger/log");
const schedule = require("node-schedule");
const getContractMarkets = require("./tasks/getContractMarkets.js");
const executeOrders = require("./tasks/executeOrders");
const allowSchedule = process.env.NODE_ENV !== 'test';

const scanMarket = async () => {
  const markets = await getContractMarkets(rpc, process.env.LIMIT_CONTRACT);
  executeOrders(rpc, markets);
};

allowSchedule && schedule.scheduleJob("30 * * * * *", function () {
  logger.info("Robo-MarketScan 🤖📠");
  scanMarket();
});
