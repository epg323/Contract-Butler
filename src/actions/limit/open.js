const open = async (api, contract, txnOwner, tokenContract, tokenSym, ramPayer) => {
  await api.transact(
    {
      actions: [
        {
          account: contract,
          name: "open",
          authorization: [
            {
              actor: process.env.BOT_WALLET_KYLIN,
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
};

module.exports = open;
