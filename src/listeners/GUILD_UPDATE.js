const Event = require('../structs/bases/Listener');
module.exports = class extends Event {
    constructor(...args) {
        super(...args, { name: 'gateway:GUILD_UPDATE', enabled: true });
    }

    async run(message) {
        await this.client.cache.guilds.set(message.id, message)
    }
}
