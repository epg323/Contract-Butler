const close_rename = async (api, contract, txnOwner, tokenContract, tokenSym) => {
  const result = await api.transact(
    {
      actions: [
        {
          account: contract,
          name: "close",
          authorization: [
            {
              actor: process.env.TEST_CUSTOMER,
              permission: "active",
            },
          ],
          data: {
            owner: txnOwner,
            token: {
              contract: tokenContract,
              sym: tokenSym,
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
  return result;
};

module.exports = close_rename;
