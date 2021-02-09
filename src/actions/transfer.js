const transfer = async (api, contract, tokenContract, from, qty) => {
  await api.transact(
    {
      actions: [
        {
          account: tokenContract, 
          name: "transfer",
          authorization: [
            {
              actor: "bravocharlie",
              permission: "active",
            },
          ],
          data: {
            from: from,
            to: contract,
            quantity: qty,
            memo: `Sent ${qty} from ${from} to ${to}`,
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

module.exports = transfer;
