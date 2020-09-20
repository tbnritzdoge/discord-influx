class Event {
    constructor(client, options = {}) {
        this.client = client;

        this.name = options.name;

        this.enabled = Boolean(options.enabled);

    }

    async _run(...args) {
        if (this.enabled) {
            try {
                await this.run(...args);
            } catch (error) {
                console.error(error);
            }
        }
    }

    run(...args) { }
}

module.exports = Event;
