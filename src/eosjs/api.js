const { Api, JsonRpc } = require("eosjs");
const { JsSignatureProvider } = require("eosjs/dist/eosjs-jssig");
const fetch = require("node-fetch");
const { TextDecoder, TextEncoder } = require("util");

const privateKeys = [process.env.PRIVATE_KEY1];

const signatureProvider = new JsSignatureProvider(privateKeys);
const rpc = new JsonRpc(`https://${process.env.DFUSE_NETWORK}`, { fetch });
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
});

module.exports = { api, rpc };
