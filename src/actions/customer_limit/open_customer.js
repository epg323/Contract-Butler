const open_customer = async (
  api,
  contract,
  txnOwner,
  tokenContract,
  tokenSym,
  ramPayer
) => {
  const result = await api.transact(
    {
      actions: [
        {
          account: contract,
          name: "open",
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
            ram_payer: ramPayer,
          },
        },
      ],
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
    }
  );
  return result
};

module.exports = open_customer;
