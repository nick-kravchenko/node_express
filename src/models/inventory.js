var redis = require('../databases/redis');

class InventoryModel {
    constructor(){}

    setInventoryToRedis(steamid, gameid, inventory){
        const redisKey = 'inventory.' + steamid + '.' + gameid;
        return redis.set(redisKey, inventory);
    }
    getInventoryFromRedis(steamid, gameid){
        const redisKey = 'inventory.' + steamid + '.' + gameid;
        return redis.client.get(redisKey);
    }
    isInventoryExists( steamid, gameid ){
        return redis.client.keys('inventory.' + steamid + '.' + gameid).then((rep) => !!rep.length);
    }

    setPricesToRedis( gameid, items ) {
        // items = [ 'key1', 'value1', 'key2', 'value2', ... ]
        return redis.client.hSet('prices.' + gameid, items).then((reply) => {
            redis.client.expire('prices.' + gameid, 60 * 10);
            return reply;
        });
    }
    getPricesFromRedis( gameid, items ) {
        // items = [ 'key1', 'key2', ... ]
        if ( !!items ) {
            return redis.client.hmGet('prices.' + gameid, items);
        } else {
            return redis.client.hGetAll('prices.' + gamdeid);
        }
    }
    isPricesExists( gameid ) {
        return redis.client.keys('prices.' + gameid).then((rep) => !!rep.length);
    }
}
module.exports = new InventoryModel();
