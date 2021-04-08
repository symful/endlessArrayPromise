const EndlessArrayPromise = require(`${__dirname}/index.js`);
const endlessArrayPromise = new EndlessArrayPromise(async function() {
	for await (let promise of this.get()) {
		console.log(promise);
	}
});

setInterval(() => {
	endlessArrayPromise.add(0);
}, 100);