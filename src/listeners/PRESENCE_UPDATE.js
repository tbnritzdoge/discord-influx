const Event = require('../structs/bases/Listener');

class presenceUpdate extends Event {
    constructor(...args) {
        super(...args, { name: 'gateway:PRESENCE_UPDATE', enabled: false });
    }

    async run(message) {
        this.client.logger.debug(JSON.stringify(message))
    }
}

module.exports = presenceUpdate;
