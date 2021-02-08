const transfer = async (api, contract) => {
  await api.transact(
    {
      actions: [
        {
          account: "eosio.token", //changes on the currency
          name: "transfer",
          authorization: [
            {
              actor: "bravocharlie",
              permission: "active",
            },
          ],
          data: {
            from: "bravocharlie",
            to: contract,
            quantity: "5.0000 EOS", //change
            memo: "generous donation", //change
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
