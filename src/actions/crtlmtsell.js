const crtlmtsell = async (api, contract) => {
  await api.transact(
    {
      actions: [
        {
          account: contract,
          name: "crtlmtsell",
          authorization: [
            {
              actor: "bravocharlie",
              permission: "active",
            },
          ],
          data: {
            owner: "bravocharlie",
            price: {
              contract: "eosio.token",
              quantity: "1.0000 EOS",
            },
            volume: {
              contract: "everipediaiq",
              quantity: "5.000 IQ",
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
};

module.exports = crtlmtsell;
