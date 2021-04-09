const EndlessArrayPromise = require(`${__dirname}/index.js`);
const endlessArrayPromise = new EndlessArrayPromise();


setInterval(() => {
  endlessArrayPromise.add(0);
}, 100);

/*setTimeout(() => {
  endlessArrayPromise.end(1);
}, 1000);*/

setTimeout(async () => {
  for await (const value of endlessArrayPromise) {
    console.log("hi", value);
  }
});

setTimeout(async () => {
  for await (const value of endlessArrayPromise) {
    console.log("hello", value);
  }
});