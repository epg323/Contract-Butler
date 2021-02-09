const clslmtsell = async (api, contract, id, mrktId) => {
  await api.transact(
    {
      actions: [
        {
          account: contract,
          name: "clslmtsell",
          authorization: [
            {
              actor: bravoCharlie,
              permission: "active",
            },
          ],
          data: {
            id: id,
            market_id: mrktId,
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

module.exports = clslmtsell;
