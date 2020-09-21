const { EventEmitter } = require('events')
module.exports = class InfluxClient extends EventEmitter {
    constructor(options){
        super(options);
        this.url = options.url;
        this.auth = options.auth;
    }
}