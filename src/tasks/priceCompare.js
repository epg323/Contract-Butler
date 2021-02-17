const { tokens } = require("../constants");
const getPrice = require("./getPrice")

const priceCompare = async (rpc,contract,limits) => {
  const executeSell = [];
  const executeBuy = [];
  await Promise.all(limits.map(async (pair) => {
    const {token1 ,token2} = pair;
    
    await Promise.all(pair.sellOrders.map( async (order) => {
        const marketPrice= await getPrice(rpc,contract,token1,token2,order)
        const reqPrice = parseFloat(order.price.split(" ")[0])
        const orderId = order.id
      
        if( marketPrice>reqPrice){
            executeBuy.push(orderId)
        }
    }))
    await Promise.all(pair.buyOrders.map( async (order) => {
        const marketPrice= await getPrice(rpc,contract,token1,token2,order)
        const reqPrice = parseFloat(order.price.split(" ")[0])
        const orderId = order.id

        if( marketPrice < reqPrice){
            executeSell.push(orderId)
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