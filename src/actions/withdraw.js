const withdraw = async (api, contract, from, to, qty) => {
  await api.transact(
    {
      actions: [
        {
          account: contract,
          name: "withdraw",
          base: "",
          authorization: [
            {
              actor: "bravocharlie",
              permission: "active",
            },
          ],
          data: {
            from: from,
            to: to,
            quantity: qty,
            memo: `${from} sent ${to} ${qty}`,
          },
        },
      ],
    },
    {
      blockBehind: 3,
      expireSeconds: 30,
    }
  );
};

module.exports = withdraw;
