# EndlessArrayPromise
Is to make your code have less callback!

## GitHub
https://github.com/NekoMaru76/endlessArrayPromise

## Usage and Example

### new EndlessArrayPromise()

Create endless array

Example:
```js
const EndlessArrayPromise = require(`endless-array-promise`);
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

### EndlessArrayPromise.error(error)

End the endless array with error

Parameters:
- error {Error}

### EndlessArrayPromise.fromCallback(func, args);

Change function that use callback to EndlessArrayPromise

Parameters:
- func {Function}
- args {Array, Default: Blank Array}

Example:
```js
const Events = require("events"),
	{ fromCallback } = require(`endless-array-promise`);
	
const events = new Events;
const on = event => const endlessArray = fromCallback(events.on.bind(events), [event]);

setInterval(() => {
	events.emit(`message`, `Hi`);
}, 100);

for await (const value of on("message")) {
	console.log(...value);
}
```

## Developer
- Gaia#9524 [Discord]

## Buy me a Coffee
- nekomaru76 [PayPal]