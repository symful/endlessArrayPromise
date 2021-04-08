# EndlessArrayPromise
Is to make your code have less callback!

## GitHub
https://github.com/NekoMaru76/endlessArrayPromise

## Example
```js
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
```

## Usage and Example

### new EndlessArrayPromise()

Create endless array
	
### EndlessArrayPromise.add(value)

Parameters:
- value {Any}
	
### EndlessArrayPromise.get() => EndlessArray {Array<Promise>}

Get endless array of promises

### EndlessArrayPromise.end(lastValue)

End the endless array

Parameters:
- lastValue {Any}

### EndlessArrayPromise.error(error)

End the endless array with error

Parameters:
- error {Error}

## Developer
- Gaia#9524 [Discord]

## Buy me a Coffee
- nekomaru76 [PayPal]