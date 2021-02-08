const open = async (api, contract) => {
  await api.transact(
    {
      actions: [
        {
          account: contract,
          name: "open",
          authorization: [
            {
              actor: "bravocharlie",
              permission: "active",
            },
          ],
          data: {
            owner: "bravocharlie",
            token: {
              contract: "everipediaiq",
              sym: "3,IQ",
            },
            ram_payer: "bravocharlie",
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
  console.log("completed");
};

module.exports = open;
