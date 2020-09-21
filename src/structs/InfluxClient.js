const { EventEmitter } = require('events')
const { InfluxDB: Influx } = require('influx')
module.exports = class InfluxClient extends EventEmitter {
    constructor(client, ...args) {
        super(client, ...args);
        this.client = client;
        this.influx = new Influx(...args)
    }
    start() {
        this.influx.getDatabaseNames().then(names => {
            if (!names.includes(process.env.INFLUX_DATABASE)) influx.createDatabase(process.env.INFLUX_DATABASE)
          })
    }
    writeBotEvent(eventName, tags) {
        this.client.logger.debug(`Writing event ${eventName} ${JSON.stringify(tags)}`)
        this.influx.writePoints([{
            measurement: 'events',
            tags: { event_type: eventName, ...tags },
            fields: { count: 1 }
        }]).catch(error => { this.client.logger.error(error) })
    }
}