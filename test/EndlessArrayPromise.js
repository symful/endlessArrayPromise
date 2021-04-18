const { EndlessArrayPromise } = require(`${__dirname}/../index.js`);
const endlessArray = new EndlessArrayPromise;

for (let i = 1; i <= 3; i++) setTimeout(async () => {
    for await (const v of endlessArray) {
        console.log(`[${i}] Received: ${v}`);
    }
});

setInterval(() => endlessArray.add(Math.random()), 100);