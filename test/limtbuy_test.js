require('dotenv').config();
var assert = require("assert");
const { asset } = require('eos-common');
const { resolve } = require("path");
const crtlmtbuy = require('../src/actions/limit/crtlmtbuy');
const open = require("../src/actions/limit/open");
const transfer = require("../src/actions/limit/transfer");
const { api, rpc } = require("../src/eosjs/api");
const {api_customer, rpc_customer} = require("../src/actions/customer_limit/api_customer");
const logger = require('../src/logger/log');
const executeOrders = require("../src/tasks/executeOrders");
const getContractMarkets = require("../src/tasks/getContractMarkets");
const open_customer = require('../src/actions/customer_limit/open_customer');
const transfer_customer = require('../src/actions/customer_limit/transfer_customer');
const crtlmtbuy_customer = require('../src/actions/customer_limit/crtlmtbuy_customer');

logger.silent = true;

describe('Creating buy test orders', function() {
      this.timeout(3500)
      it("Opens Account", async function(){          
          const result = await open_customer(api_customer, 'mindswaplimt', 'bravocharliz',"prediqtokens","3,YEMSWAP","bravocharliz")
          assert.equal(result.processed.receipt.status,"executed")
      })
      it("Transfers 1 YEMSWAP ", async function(){
        const result = await transfer_customer(api_customer, "mindswaplimt", "prediqtokens", "bravocharliz", "1.000 YEMSWAP");
        assert.equal(result.processed.receipt.status,"executed")
    })
    it("Creates Limit Buy Order", async function(){
        const result = await crtlmtbuy_customer(api_customer, "mindswaplimt", "bravocharliz",  "prediqtokens","everipediaiq","1.000 YEMSWAP", "1.000 IQ");
        assert.equal(result.processed.receipt.status,"executed")
    })

    it("Transfers 1 YEMSWAP ", async function(){
      const result = await transfer_customer(api_customer, "mindswaplimt", "prediqtokens", "bravocharliz", "1.000 YEMSWAP");
      assert.equal(result.processed.receipt.status,"executed")
    })
    it("Creates Limit Buy Order a second time", async function(){
        const result = await crtlmtbuy_customer(api_customer, "mindswaplimt", "bravocharliz",  "prediqtokens","everipediaiq","1.000 YEMSWAP", "1.000 IQ");
        assert.equal(result.processed.receipt.status,"executed")
    })
    it("Scanning Market",async function(){
        const scanMarket = async () => {
            const markets = await getContractMarkets(rpc_customer, process.env.LIMIT_CONTRACT);
            return await executeOrders(rpc, markets);
        };
        const result = await scanMarket();
        assert.equal(result, "Done")
    })
});
