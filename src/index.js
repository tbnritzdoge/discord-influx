require('dotenv').config()
const Client = require('./structs/Client')
const { Constants } = require('detritus-client-socket');


const client = new Client(process.env.TOKEN, {
    presence: {
        activity: {
            name: 'something cool',
            type: Constants.GatewayActivityTypes.WATCHING,
        },
        status: Constants.GatewayPresenceStatuses.DND,
    }
});

client.on('ready', () => {
    client.logger.log(`ready`)
});
(async () => {
    await client.connect('wss://gateway.discord.gg/');
})()