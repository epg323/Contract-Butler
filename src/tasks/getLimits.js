const {getSellOrders, getBuyOrders} = require('../eosjs/getBlock');

const getLimits = async (rpc,contract,markets)=> {
    let limitData=[];
    await Promise.all(markets.map( async (market) =>{
        const {id,token1,token2} = market
        const sellOrders = await getSellOrders(rpc,contract,id)
        const buyOrders = await getBuyOrders(rpc,contract,id)
        let minSell=[];
        let minBuy=[];
        buyOrders.rows.forEach(price => minBuy.push(parseFloat(price.price.split(" ")[0])))
        sellOrders.rows.forEach(price => minSell.push(parseFloat(price.price.split(" ")[0])))
        const buyUpperBound = minBuy.length > 0? Math.max(...minBuy) : null;
        const sellLowerBound = minSell.length > 0? Math.min(...minSell) : null;

        limitData.push({"id":id, "token1":token1, "token2":token2, "sellOrders": sellOrders.rows, "buyOrders": buyOrders.rows, "mostExpensiveBuy":buyUpperBound, "cheapestSale": sellLowerBound});
        }));
    return limitData;
}

module.exports=getLimits;