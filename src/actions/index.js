const open = async (api, contract) => {
    console.log("contract", contract)
    await api.transact({
       actions:[ 
           {account: contract,
        name:'open',
        authorization:[{
          actor:'bravocharlie',
          permission: 'active'
        }],
        data:{
          owner:'bravocharlie',
          token:{
              contract:'eosio.token',
              sym:'4,EOS'
            },
          ram_payer:'bravocharlie'
        }}
    ]
    },
    {
        blocksBehind: 3,
        expireSeconds: 30,
      }
    );
    console.log("completed")
}

const

module.exports = {open, close, withdraw, crtlmtbuy, crtlmtsell, clslmtbuy, clslmtsell }