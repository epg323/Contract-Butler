const getBlock = async (rpc)=>{
    return await rpc.get_block(1)
};

module.exports = getBlock;