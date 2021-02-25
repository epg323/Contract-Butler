const transfer = async (api, contract, tokenContract, from, qty) => {
  const result = await api.transact(
    {
      actions: [
        {
          account: tokenContract,
          name: "transfer",
          authorization: [
            {
              actor: process.env.BOT_WALLET_KYLIN,
              permission: "active",
            },
          ],
          data: {
            from: from,
            to: contract,
            quantity: qty,
            memo: `Sent ${qty} from ${from} to ${contract}`,
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
  return result;
};

module.exports = transfer;
