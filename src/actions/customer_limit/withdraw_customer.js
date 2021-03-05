const withdraw_customer = async (api, contract, from, to, tokenContract, qty) => {
  const result = await api.transact(
    {
      actions: [
        {
          account: contract,
          name: "withdraw",
          authorization: [
            {
              actor: process.env.TEST_CUSTOMER,
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
  return result;
};

module.exports = withdraw_customer;
