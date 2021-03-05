const { Api, JsonRpc } = require("eosjs");
const { JsSignatureProvider } = require("eosjs/dist/eosjs-jssig");
const fetch = require("node-fetch");
const { TextDecoder, TextEncoder } = require("util");

const privateKeys = [process.env.PRIVATE_KEY_CUSTOMER];

const signatureProvider = new JsSignatureProvider(privateKeys);
const rpc_customer = new JsonRpc(`https://${process.env.DFUSE_NETWORK}`, { fetch });
const api_customer = new Api({
  rpc:rpc_customer,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
});

module.exports = { api_customer, rpc_customer };
