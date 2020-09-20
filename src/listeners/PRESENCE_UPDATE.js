const Event = require('../structs/bases/Listener');

class presenceUpdate extends Event {
    constructor(...args) {
        super(...args, { name: 'gateway:PRESENCE_UPDATE', enabled: true });
    }

    async run(message) {
        console.log(message)
    }
}

module.exports = presenceUpdate;
