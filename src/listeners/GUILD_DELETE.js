const Event = require('../structs/bases/Listener');
module.exports = class extends Event {
    constructor(...args) {
        super(...args, { name: 'gateway:GUILD_DELETE', enabled: true });
    }

    async run(message) {
        this.client.guilds = this.client.guilds.filter(guild => guild.id !== message.id)
    }
}
