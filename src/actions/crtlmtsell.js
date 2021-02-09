const crtlmtsell = async (api, contract, txnOwner, tokenContract1, tokenContract2, tokenSym1, tokenSym2) => {
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
            owner: txnOwner,
            price: {
              contract: tokenContract1,
              quantity: tokenSym1,
            },
            volume: {
              contract: tokenContract2,
              quantity: tokenSym2,
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
