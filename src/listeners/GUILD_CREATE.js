const Event = require('../structs/bases/Listener');
module.exports = class extends Event {
    constructor(...args) {
        super(...args, { name: 'gateway:GUILD_CREATE', enabled: true });
    }

    async run(message) {
        await this.client.guilds.push(message.id)
        await this.client.influx.writeMemberCount(message.id, message.member_count)
    }
}
