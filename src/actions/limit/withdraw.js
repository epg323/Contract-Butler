const withdraw = async (api, contract, from, to, tokenContract , qty) => {
  await api.transact(
    {
      actions: [
        {
          account: contract,
          name: "withdraw",
          authorization: [
            {
              actor: "bravocharlie",
              permission: "active",
            },
          ],
          data: {
            from: from,
            to: to,
            quantity: {
              contract: tokenContract,
              quantity: qty,
            },
            memo: `${from} sent ${to} ${qty}`,
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

module.exports = withdraw;
