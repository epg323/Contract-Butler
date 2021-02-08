require("dotenv").config();
global.fetch = require("node-fetch");
global.WebSocket = require("ws");
const { dfuseClient, createDfuseClient } = require("@dfuse/client");
const { api, rpc } = require("./eosjs/api");
const { getBlock, getAccount, getCode } = require("./eosjs/getBlock");
const { open, close, crtlmtbuy, transfer } = require("./actions");
const { DFUSE_API_KEY, DFUSE_NETWORK } = process.env;

//getBlock(rpc).then(data => console.log("this is the data:",data))
getAccount(rpc, "mindswaplimt").then((data) =>
  console.log("this is the data", data)
);
getCode(rpc, "mindswaplimt").then((data) =>
  console.log(
    "this is the code",
    JSON.stringify(data.abi),
    data.abi.structs[8].fields
  )
);
//open(api, 'mindswaplimt')
//close(api,'mindswaplimt')
crtlmtbuy(api, "mindswaplimt");
transfer(api, "mindswaplimt");
const client = createDfuseClient({
  apiKey: DFUSE_API_KEY,
  network: "eos.dfuse.eosnation.io", // DFUSE_NETWORK
});

const operation = `subscription($cursor: String!) {
    searchTransactionsForward(query:"receiver:eosio.token action:transfer -data.quantity:'0.0001 EOS'", cursor: $cursor) {
      undo cursor
      trace { id matchingActions { json } }
    }
  }`;

async function main() {
  const stream = await client.graphql(operation, (message) => {
    if (message.type === "data") {
      const {
        undo,
        cursor,
        trace: { id, matchingActions },
      } = message.data.searchTransactionsForward;
      matchingActions.forEach(({ json: { from, to, quantity } }) => {
        console.log(
          `Transfer ${from} -> ${to} [${quantity}]${undo ? " REVERTED" : ""}`
        );
      });

      // Mark stream at cursor location, on re-connect, we will start back at cursor
      stream.mark({ cursor });
    }

    if (message.type === "error") {
      console.log("An error occurred", message.errors, message.terminal);
    }

    if (message.type === "complete") {
      console.log("Completed");
    }
  });

  // Waits until the stream completes, or forever
  await stream.join();
  await client.release();
}

//main().catch(error => console.log('Unexpected error', error));

module.exports = dfuseClient;
