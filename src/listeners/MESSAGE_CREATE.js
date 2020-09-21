const Event = require('../structs/bases/Listener');

class messageCreate extends Event {
    constructor(...args) {
        super(...args, { name: 'gateway:MESSAGE_CREATE', enabled: true });
    }

    async run(message) {
        this.client.influx.writeBotEvent(`MESSAGE_CREATE`, {
            guild_id: message.guild_id,
            channel_id: message.channel_id,
            user_id: message.author.id
          })
    }
}

module.exports = messageCreate;
