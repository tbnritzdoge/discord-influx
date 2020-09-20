const path = require("path");
const { promises: { lstat, readdir } } = require("fs");
const Collection = require('./bases/Collection');

class Handler {
    constructor(client) {
        this.client = client;
        this.events = new Collection();
    }

    registerEvent(event) {
        if (typeof event === 'function') event = new event(this.client);

        this.events.set(event.name, event);


        switch (event.name.split(`:`)[0]) {
            case 'gateway': {
                this.client.events.on(
                    event.name.split(`:`)[1],
                    event._run.bind(event)
                );
                break;
            }
            case 'influx': {
                this.client.influxClient.on(
                    event.name.split(`:`)[1],
                    event._run.bind(event)
                );
                break;
            }
        }
    }

    registerEvents(events) {
        if (!Array.isArray(events)) return;
        for (const event of events) {
            this.registerEvent(event);
        }
    }

    async registerEventsIn(Path) {
        const files = await Handler.walk(
            Path,
            {
                filter: (stats, file) => stats.isFile() && file.endsWith('.js')
            }
        );
        const events = [];
        for (let event of files) {
            event = require(`${event[0]}`);
            events.push(event);
        }

        return this.registerEvents(events);
    }

    static async walk(dir, options = {}, results = new Map(), level = -1) {
        dir = path.resolve(dir);
        const stats = await lstat(dir);
        if (!options.filter || options.filter(stats, dir)) results.set(dir, stats);
        if (stats.isDirectory() && (typeof options.depthLimit === "undefined" || level < options.depthLimit)) {
            await Promise.all((await readdir(dir)).map((part) => Handler.walk(path.join(dir, part), options, results, ++level)));
        }
        return results;
    }
    async start() {
        await this.registerEventsIn(`${path.dirname(require.main.filename)}${path.sep}listeners`);
        return true;
    }
}

module.exports = Handler;
