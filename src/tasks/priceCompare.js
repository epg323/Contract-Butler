const { tokens } = require("../constants");
const getPrice = require("./getPrice")

const priceCompare = async (rpc,contract,limits) => {
  const executeSell = [];
  const executeBuy = [];
  await Promise.all(limits.map(async (pair) => {
    const {token1 ,token2} = pair;
    
    await Promise.all(pair.sellOrders.map( async (order) => { // TODO: update Buy Orders promise , copy Sell Orders promise
        const {marketPrice, pool}= await getPrice(rpc,contract,token1,token2,order)
        const reqPrice = parseFloat(order.price.split(" ")[0])
        const orderId = order.id
      
        if( marketPrice>=reqPrice){
            console.log(`Order #${orderId} can be fulfilled. ${token1.sym.split(",")[1]} is ${marketPrice-reqPrice} above requested price.`)
            executeSell.push(orderId)
        }
    }))
    await Promise.all(pair.buyOrders.map( async (order) => {
        const {marketPrice,poolName, minAmt}= await getPrice(rpc,contract,token1,token2,order)
        const reqPrice = parseFloat(order.price.split(" ")[0])
        const orderId = order.id
        if( marketPrice <= reqPrice){
            console.log(`Order #${orderId} can be fulfilled. ${token1.sym.split(",")[1]} is ${reqprice=marketPrice} below requested price.`)
            executeBuy.push({
              orderId: orderId,
              orderBalance: order.balance,
              token1Sym: token1.sym.split(",")[1],
              token1Contract:token1.contract,
              token2sym: token2.sym.split(",")[1],
              token2Contract: token2.contract,
              min_expected: minAmt.toString(),
              pool: poolName
            })
        }
    }))
  }
  ))

  return {
    SalesToExecute: executeSell,
    BuysToExecute: executeBuy,
  };
}

module.exports = priceCompare;