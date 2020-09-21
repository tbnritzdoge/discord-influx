const { Gateway: { Socket } } = require('detritus-client-socket');
const { EventEmitter } = require(`events`)
const Logger = require('./logger')
const Handler = require('./Handler')
module.exports = class Client extends Socket {
    constructor(...args) {
        super(...args);
        this.events = new EventEmitter();
        this.logger = new Logger()
        this.handler = new Handler(this)
    }
    async start() {
        await this.handler.start()
        this.on('packet', (packet) => {
            if (this.handler.events.map(g => g.name.split(':')[1]).includes(packet.t)) {
                this.events.emit(packet.t, packet.d)
            }
        })
    }
    async connect(opts) {
        super.connect(opts)
        await this.start()
    }
}