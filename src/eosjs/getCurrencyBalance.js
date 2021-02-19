const { symbol_code } = require("eos-common");

const getCurrencyBalance = async (rpc, contract, sym) => {
    return await rpc.get_currency_balance(
      contract,
      "bravocharlie",
      sym
    )
  }

module.exports = getCurrencyBalance;