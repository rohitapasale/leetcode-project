const { createClient } =  require("redis");





const redisclient= createClient({
    username: 'default',
    password: 'HcD66w2enuaoxsUjlFDBRrMdNZjJVpPc',
    socket: {
        host: 'cherries-wing-crayon-44286.db.redis.io',
        port: 16393
    }
});


module.exports=redisclient;