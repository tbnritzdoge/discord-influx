const { EventEmitter } = require('events')
const { InfluxDB: Influx } = require('influx')
const centra = require('@aero/centra')
module.exports = class InfluxClient extends EventEmitter {
    constructor(client, ...args) {
        super(client, ...args);
        this.client = client;
        this.influx = new Influx(...args)
    }
    async start() {
        this.influx.getDatabaseNames().then(names => {
            if (!names.includes(process.env.INFLUX_DATABASE)) this.influx.createDatabase(process.env.INFLUX_DATABASE)
        })
    }
    writeBotEvent(eventName, tags) {
        this.client.logger.debug(`Writing event ${eventName} ${JSON.stringify(tags)}`)
        this.influx.writePoints([{
            measurement: 'events',
            tags: { event_type: eventName, ...tags },
            fields: { count: 1 }
        }], { database: process.env.INFLUX_DATABASE }).catch(error => { this.client.logger.error(error) })
    }
    async writeMemberCount(guildId, amount) {
        if (!amount) {
            amount = (await centra(`https://discord.com/api/guilds/${guildId}`).header(`Authorization`, `Bot ${process.env.TOKEN}`).query(`with_counts`, true).json()).approximate_member_count
        }
        this.influx.writePoints([{
            measurement: 'members',
            tags: { guild_id: guildId },
            fields: { member_count: amount }
        }], { database: process.env.INFLUX_DATABASE }).catch(error => { this.client.logger.error(error) })
    }
}