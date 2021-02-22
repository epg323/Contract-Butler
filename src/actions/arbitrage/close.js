const close = async (api, contract, txnOwner, tokenContract, tokenSym) => {
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
  };
  
  module.exports = close;
  