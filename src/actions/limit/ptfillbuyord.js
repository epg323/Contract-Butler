const ptfillbuyord = async (api, contract, marketId, orderId, amt) => {
  await api.transact(
    {
      actions: [
        {
          account: contract,
          name: "ptfillbuyord",
          authorization: [
            {
              actor: process.env.BOT_WALLET_KYLIN,
              permission: "active",
            },
          ],
          data: {
            market_id: marketId,
            id: orderId,
            amount: amt,
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
};

module.exports = ptfillbuyord;
