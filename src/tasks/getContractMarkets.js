const { getMarkets } = require("../eosjs/getBlock");

const getContractMarkets = async function (rpc, contract) {
  const marketData = await getMarkets(rpc, contract);
  return marketData.rows;
};

module.exports = getContractMarkets;
