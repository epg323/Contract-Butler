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
const open_customer = require("../src/actions/customer_limit/open_customer");
const {api_customer, rpc_customer} = require("../src/actions/customer_limit/api_customer");
const transfer_customer = require("../src/actions/customer_limit/transfer_customer");
const crtlmtsell_customer = require("../src/actions/customer_limit/crtlmtsell_customer");

logger.silent = true;

describe('Creating sell test orders', function() {
      this.timeout(3500)
      it("Opens Account", async function(){          
          const result = await open_customer(api_customer, 'mindswaplimt', 'bravocharliz',"prediqtokens","3,YEMSWAP","bravocharliz")
          assert.equal(result.processed.receipt.status,"executed")
      })
      it("Transfers 1 IQ ", async function(){
        const result = await transfer_customer(api_customer, "mindswaplimt", "everipediaiq", "bravocharliz", "1.000 IQ");
        assert.equal(result.processed.receipt.status,"executed")
    })
    it("Creates Limit Sell Order", async function(){
        const result = await crtlmtsell_customer(api_customer, "mindswaplimt", "bravocharliz",  "prediqtokens","everipediaiq","0.500 YEMSWAP", "1.000 IQ");
        assert.equal(result.processed.receipt.status,"executed")
    })
    it("Opens Account a second time", async function(){          
        const result = await open_customer(api_customer, 'mindswaplimt', 'bravocharliz',"everipediaiq","3,IQ","bravocharliz")
        assert.equal(result.processed.receipt.status,"executed")
    })
    it("Transfers 1 IQ ", async function(){
      const result = await transfer_customer(api_customer, "mindswaplimt", "everipediaiq", "bravocharliz", "1.000 IQ");
      assert.equal(result.processed.receipt.status,"executed")
  })
  it("Creates Limit Sell Order for the second time", async function(){
      const result = await crtlmtsell_customer(api_customer, "mindswaplimt", "bravocharliz",  "prediqtokens","everipediaiq","0.500 YEMSWAP", "1.000 IQ");
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