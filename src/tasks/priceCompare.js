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
      
        if( marketPrice>=reqPrice){
            console.log(`Order #${orderId} can be fulfilled. ${token1.sym.split(",")[1]} is ${marketPrice-reqPrice} above requested price.`)
            executeBuy.push(orderId)
        }
    }))
    await Promise.all(pair.buyOrders.map( async (order) => {
        const marketPrice= await getPrice(rpc,contract,token1,token2,order)
        const reqPrice = parseFloat(order.price.split(" ")[0])
        const orderId = order.id

        if( marketPrice <= reqPrice){
            console.log(`Order #${orderId} can be fulfilled. ${token1.sym.split(",")[1]} is ${reqprice=marketPrice} above below price.`)
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