const EndlessArrayPromise = require(`${__dirname}/index.js`);
const endlessArrayPromise = new EndlessArrayPromise();

const collect = [[], [], []];

setTimeout(async () => {
  for await (const value of endlessArrayPromise) {
    console.log("One:", value);
    collect[0].push(value);
  }
});

setTimeout(async () => {
  for await (const value of endlessArrayPromise) {
    console.log("Two:", value);
    collect[1].push(value);
  }
});

setTimeout(() => {
  const interval = setInterval(() => {
    endlessArrayPromise.add(Math.random());
    collect[2].push(0);
  }, 0);

  setTimeout(() => {
    clearInterval(interval);
    endlessArrayPromise.end(1);
    console.log(`One Received: ${collect[0].length}\nTwo Received: ${collect[1].length}\nSent: ${collect[2].length}`);
  }, 1000);
}, 1000);