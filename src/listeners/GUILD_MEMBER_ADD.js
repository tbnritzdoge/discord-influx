const Event = require('../structs/bases/Listener');

module.exports = class extends Event {
    constructor(...args) {
        super(...args, { name: 'gateway:GUILD_MEMBER_ADD', enabled: true });
    }

    async run(message) {
        this.client.influx.writeBotEvent(`GUILD_MEMBER_ADD`, {
            guild_id: message.guild_id,
            user_id: message.user.id
        })
    }
}
