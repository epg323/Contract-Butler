const arbpairtrade = async (api,contract,accnt,marketId,ordersType,ordersIds,pool) => {
    await api.transact({ actions:[{
        account: contract,
        name: "arbpairtrade",
        authorization:[{
            actor:"bravocharlie",
            permission: "active"
        }],
        data:{
            account:accnt,
            market_id:marketId,
            orders_type:ordersType,
            orders_ids:ordersIds,
            mindswap_pool: pool 
        }
    }]},{
        blocksBehind:3,
        expireSeconds:30
    })
}

module.exports = arbpairtrade; 
