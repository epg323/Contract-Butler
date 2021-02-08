const getBlock = async (rpc) => {
  return await rpc.get_block(1);
};

const getAccount = async (rpc, contract) => {
  return await rpc.get_account(contract);
};

const getCode = async (rpc, contract) => {
  return await rpc.get_code(contract);
};

const txn = async (api, contract) => {
  console.log("contract", contract);
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
              contract: "eosio.token",
              sym: "4,EOS",
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

module.exports = { getBlock, getAccount, getCode, txn };
