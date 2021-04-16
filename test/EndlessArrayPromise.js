const { EndlessArrayPromise } = require(`${__dirname}/../index.js`);
const endlessArray = new EndlessArrayPromise;
const collect = [[], []];
const send = [];
const iterator = [endlessArray[Symbol.asyncIterator](), endlessArray[Symbol.asyncIterator]()];

const interval0 = setInterval(async () => {
  const next = await iterator[0].next();
  
  if (next.done) {
    console.log(`[0] Ended, Received: ${collect[0].length} values`);
    return clearInterval(interval0);
  }

  collect[0].push(next.value);
  console.log(`[0] Received: ${next.value} [${iterator[0].index}]`);
}, 0);

const interval1 = setInterval(async () => {
  const next = await iterator[1].next();
  
  if (next.done) {
    console.log(`[1] Ended, Received: ${collect[1].length} values`);
    return clearInterval(interval1);
  }

  collect[1].push(next.value);
  console.log(`[1] Received: ${next.value} [${iterator[1].index}]`);
}, 300);

const interval = setInterval(() => {
  const v = Math.random();
 
  endlessArray.add(v);
  console.log(`[-1] Sent: ${v} [${endlessArray.promises.length-2}]`);
}, 100);

setTimeout(() => {
    clearInterval(interval);
    console.log(`[-1] Ended, Sent: ${endlessArray.promises.length} values`);
    endlessArray.end(1);
}, 4090);