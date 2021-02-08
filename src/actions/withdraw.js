const withdraw = async (api, contract) => {
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
            from: "",
            to: "",
            quantity: "",
            memo: "From your favorite bot",
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
