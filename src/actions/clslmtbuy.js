const clslmtbuy = async (api, contract) => {
  await api.transact(
    {
      actions: [
        {
          account: contract,
          name: "",
          authorization: [
            {
              actor: bravoCharlie,
              permission: "active",
            },
          ],
          data: {
            id: "",
            market_id: "",
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

module.exports = clslmtbuy;
