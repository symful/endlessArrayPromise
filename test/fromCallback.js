const Events = require("events");
const fromCallback = require(`${__dirname}/../fromCallback.js`);

const events = new Events;
const promisified = fromCallback(events.on.bind(events), [`message`]);

setTimeout(async () => {
	for await (const value of promisified) {
		console.log(...value);
	}
});

setInterval(() => {
	events.emit(`message`, 'Hi');
}, 1000);