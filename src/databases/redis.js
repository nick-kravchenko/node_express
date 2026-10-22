var redis = require('redis');

class Redis {
    constructor(){
        this.open();
    }

    open(){
        const client = this.client = redis.createClient();
        client.on('error', (err) => console.error(err));
        client.connect().catch(() => {});
    }

    set( key, value ){
        return this.client.set(key, value, { NX: true, EX: 10*60 }).then(function(reply) {console.log(reply); return reply;})
    }

    get( key ){
        return this.client.get(key);
    }

    close(){
        this.client.quit();
    }
}
module.exports = new Redis();
