const Event = require('../structs/bases/Listener');
module.exports = class extends Event {
    constructor(...args) {
        super(...args, { name: 'gateway:GUILD_CREATE', enabled: true });
    }

    async run(message) {
        await this.client.cache.guilds.set(message.id, message)
        for(const channel of message.channels) {
            await this.client.cache.channels.set(channel.id, channel)
        }
        await this.client.influx.writeMemberCount(message.id, message.member_count)
    }
}
