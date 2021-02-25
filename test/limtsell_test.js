require('dotenv').config();
var assert = require("assert");
const { resolve } = require("path");
const crtlmtsell = require("../src/actions/limit/crtlmtsell");
const open = require("../src/actions/limit/open");
const transfer = require("../src/actions/limit/transfer");
const { api, rpc } = require("../src/eosjs/api");
const logger = require('../src/logger/log');
const executeOrders = require("../src/tasks/executeOrders");
const getContractMarkets = require("../src/tasks/getContractMarkets");

logger.silent = true;

describe('Creating sell test orders', function() {
      this.timeout(2500)
      it("Opens Account", async function(){          
          const result = await open(api, 'mindswaplimt', 'bravocharlie',"everipediaiq","3,IQ","bravocharlie")
          assert.equal(result.processed.receipt.status,"executed")
      })
      it("Transfers 1 IQ ", async function(){
        const result = await transfer(api, "mindswaplimt", "everipediaiq", "bravocharlie", "1.000 IQ");
        assert.equal(result.processed.receipt.status,"executed")
    })
    it("Creates Limit Sell Order", async function(){
        const result = await crtlmtsell(api, "mindswaplimt", "bravocharlie",  "prediqtokens","everipediaiq","0.500 YEMSWAP", "1.000 IQ");
        assert.equal(result.processed.receipt.status,"executed")
    })
    it("Scanning Market",async function(){
        const scanMarket = async () => {
            const markets = await getContractMarkets(rpc, process.env.LIMIT_CONTRACT);
            return await executeOrders(rpc, markets);
        };
        const result = await scanMarket();
        assert.equal(result, "Done")
    })
});

