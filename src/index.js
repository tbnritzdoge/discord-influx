require('dotenv').config()
const Client = require('./structs/Client')
const { Constants } = require('detritus-client-socket');


const client = new Client(process.env.TOKEN, {
    presence: {
        activity: {
            name: 'something cool',
            type: Constants.GatewayActivityTypes.WATCHING,
        },
        status: 'dnd',
    },
});

client.on('ready', async () => {
    await client.start()
    console.log(`ready`)
});
client.connect('wss://gateway.discord.gg/');