const fillbuyord = async (api,contract,marketId,orderId) => {
    await api.transact({ actions:[{
        account: contract,
        name: "fillbuyord",
        authorization:[{
            actor:"bravocharlie",
            permission: "active"
        }],
        data:{
            market_id:marketId,
            id:orderId 
        }
    }]},{
        blocksBehind:3,
        expireSeconds:30
    })
}

module.exports = fillbuyord; 
