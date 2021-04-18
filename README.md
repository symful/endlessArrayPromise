# EndlessArrayPromise
Is to make your code have less callback!

## GitHub
https://github.com/NekoMaru76/endlessArrayPromise

## Usage and Example

### new EndlessArrayPromise()

Create endless array

Example:
```js
const { EndlessArrayPromise } = require(`endless-array-promise`);
const endlessArrayPromise = new EndlessArrayPromise();

setInterval(() => {
	endlessArrayPromise.add(0);
}, 100);

setTimeout(async () => {
	for await (let value of endlessArrayPromise) {
		console.log(value);
	}
});
```
	
### EndlessArrayPromise.add(value)

Parameters:
- value {Any}

### EndlessArrayPromise\[Symbol.asyncIterator]()

Get iterator object of promises

### EndlessArrayPromise.end(lastValue)

End the endless array

Parameters:
- lastValue {Any}

### fromCallback(func, startArgs, endArgs);

Change function that use callback to EndlessArrayPromise

Parameters:
- func {Function}
- startArgs {Array, Default: Array}
- endArgs {Array, Default: Array}

Example:
```js
const Events = require("events"),
	{ fromCallback } = require(`endless-array-promise`);
	
const events = new Events;
const on = event => fromCallback(events.on.bind(events), [event]);

setInterval(() => {
	events.emit(`message`, `Hi`);
}, 100);

setTimeout(async () => {
  for await (const value of on("message")) {
	  console.log(...value);
  }
});
```

## Developer
- Gaia#9524 [Discord]

## Changelogs
Check CHANGELOGS.md in module's folder

## Buy me a Coffee
- nekomaru76 [PayPal]