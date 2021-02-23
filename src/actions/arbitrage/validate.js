const arbordtrade = async (api,contract,accnt,type,amt,tokenContract,recipient) => {
    await api.transact({ actions:[{
        account: contract,
        name: "validate",
        authorization:[{
            actor:process.env.BOT_WALLET_KYLIN,
            permission: "active"
        }],
        data:{
            account:accnt,
            type:type,
            expected_balance:{
                contract:tokenContract,
                quantity: amt
            },
            recipient:recipient,
        }
    }]},{
        blocksBehind:3,
        expireSeconds:30
    })
}

module.exports = arbordtrade; 
