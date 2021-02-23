const arbordtrade = async (
  api,
  contract,
  accnt,
  marketId,
  orderType,
  orderId,
  amt,
  pool
) => {
  await api.transact(
    {
      actions: [
        {
          account: contract,
          name: "arbordtrade",
          authorization: [
            {
              actor: process.env.BOT_WALLET_KYLIN,
              permission: "active",
            },
          ],
          data: {
            account: accnt,
            market_id: marketId,
            order_type: orderType,
            order_id: orderId,
            amount: amt,
            mindswap_pool: pool,
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

module.exports = arbordtrade;
