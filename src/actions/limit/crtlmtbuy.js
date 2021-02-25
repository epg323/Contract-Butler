const crtlmtbuy = async (
  api,
  contract,
  txnOwner,
  tokenContract1,
  tokenContract2,
  tokenSym1,
  tokenSym2
) => {
  const result = await api.transact(
    {
      actions: [
        {
          account: contract,
          name: "crtlmtbuy",
          authorization: [
            {
              actor: process.env.BOT_WALLET_KYLIN,
              permission: "active",
            },
          ],
          data: {
            owner: txnOwner,
            price: {
              contract: tokenContract1,
              quantity: tokenSym1,
            },
            volume: {
              contract: tokenContract2,
              quantity: tokenSym2,
            },
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

module.exports = crtlmtbuy;
