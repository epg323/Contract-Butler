const fillsellord = async (api, contract, marketId, orderId) => {
  await api.transact(
    {
      actions: [
        {
          account: contract,
          name: "fillsellord",
          authorization: [
            {
              actor: process.env.BOT_WALLET_KYLIN,
              permission: "active",
            },
          ],
          data: {
            market_id: marketId,
            id: orderId,
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

module.exports = fillsellord;
