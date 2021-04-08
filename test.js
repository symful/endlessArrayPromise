const EndlessArrayPromise = require(`${__dirname}/index.js`);
const endlessArrayPromise = new EndlessArrayPromise();

setInterval(() => {
	endlessArrayPromise.add(0);
}, 100);

setTimeout(async () => {
	for await (let promise of endlessArrayPromise.get()) {
		console.log(promise);
	}
});