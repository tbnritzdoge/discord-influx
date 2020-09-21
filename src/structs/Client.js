const { Gateway: { Socket } } = require('detritus-client-socket');
const { EventEmitter } = require(`events`)
const Logger = require('./logger')
const InfluxClient = require('./InfluxClient')
const Influx = require('influx')
const Handler = require('./Handler')
module.exports = class Client extends Socket {
    constructor(...args) {
        super(...args);
        this.events = new EventEmitter();
        this.logger = new Logger()
        this.influx = new InfluxClient(this, `https://influx.helper.wtf`, {
            database: 'default',
            schema: [
              {
                measurement: 'members',
                fields: {
                  member_count: Influx.FieldType.INTEGER
                },
                tags: ['guild_id']
              },
              {
                measurement: 'events',
                fields: {
                  count: Influx.FieldType.INTEGER
                },
                tags: ['event_type', 'channel_id', 'guild_id', 'user_id']
              }
            ]
          })
        this.handler = new Handler(this)
    }
    async start() {
        await this.handler.start()
        await this.influx.start()
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