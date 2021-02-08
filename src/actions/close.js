const close = async (api, contract) => {
  api.transact(
    {
      actions: [
        {
          account: contract,
          name: "close",
          authorization: [
            {
              actor: "bravocharlie",
              permission: "active",
            },
          ],
          data: {
            owner: "bravocharlie",
            token: {
              contract: "eosio.token",
              sym: "4,EOS",
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

module.exports = close;
