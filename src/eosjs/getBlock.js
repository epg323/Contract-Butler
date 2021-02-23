const getBlock = async (rpc) => {
  return await rpc.get_block(1);
};

const getAccount = async (rpc, contract) => {
  return await rpc.get_account(contract);
};

const getCode = async (rpc, contract) => {
  return await rpc.get_code(contract);
};

const getTransfers = async (rpc, contract) => {
  return await rpc.get_table_rows({
    code: contract,
    scope: '',
    table:'buyorders',
    json:true,
    limit:250,
    reverse:true,
  })
}

const getSupply = async (rpc, contract,pool) => {
  return await rpc.get_table_rows({
    code: contract,
    scope: pool,
    table:'stat',
    json:true,
    limit:250,
    reverse:true
  })
}

const getSellOrders = async (rpc, contract, marketId) => {
  return await rpc.get_table_rows({
    code: contract,
    scope: marketId,
    table:'sellorders',
    json:true,
    limit:250,
    reverse:true,
  })
}

const getBuyOrders = async (rpc, contract, marketId) => {
  return await rpc.get_table_rows({
    code: contract,
    scope: marketId,
    table:'buyorders',
    json:true,
    limit:250,
    reverse:true,
  })
}

const getMarkets = async (rpc, contract) => {
  return await rpc.get_table_rows({
    code: contract,
    scope: process.env.LIMIT_CONTRACT,
    table:'markets',
    json:true,
    limit:250,
    reverse:true,
  })
}

module.exports = { getBlock, getAccount, getCode, getTransfers, getSupply, getSellOrders, getBuyOrders, getMarkets };
