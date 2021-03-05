const transfer_customer = async (api, contract, tokenContract, from, qty) => {
  const result = await api.transact(
    {
      actions: [
        {
          account: tokenContract,
          name: "transfer",
          authorization: [
            {
              actor: process.env.TEST_CUSTOMER,
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

module.exports = transfer_customer;
