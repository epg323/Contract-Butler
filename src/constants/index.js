const tokens = [
  {
    name: "IQ",
    precision: 3,
    contract: "everipediaiq",
    icon: "tokens/iq.png",
    marketId: -1,
    side: null,
    allowedTrades: [
      { token: "NOMSWAP", pool: "INMSWAP", precision: 3 },
      { token: "YEMSWAP", pool: "IYMSWAP", precision: 3 },
    ],
    isDefault: true,
    isSelected: false,
  },
  {
    name: "NOMSWAP",
    precision: 3,
    contract: "prediqtokens",
    icon: "tokens/eos.png",
    marketId: 2,
    side: null,
    allowedTrades: [{ token: "IQ", pool: "INMSWAP", precision: 3 }],
    isSelected: false,
    isDefault: false,
  },
  {
    name: "YEMSWAP",
    precision: 3,
    contract: "prediqtokens",
    icon: "tokens/yestrump.png",
    marketId: 3,
    side: 1,
    allowedTrades: [{ token: "IQ", pool: "IYMSWAP", precision: 3 }],
    isSelected: false,
    isDefault: false,
  },
];

const balances = [
  {
    name: "INOMSWAP",
    precision: 3,
    contract: "mindswapswap",
    balance: 0,
    icon: "tokens/yesdfs.png",
  },
  {
    name: "IYEMSWAP",
    precision: 3,
    contract: "mindswapswap",
    balance: 0,
    icon: "tokens/nodfs.png",
  },
];

for (const token of tokens) {
  balances.push({
    name: token.name,
    precision: token.precision,
    contract: token.contract,
    balance: 0,
    icon: token.icon,
  });
}

module.exports.tokens = tokens;
module.exports.balances = balances;
