# EndlessArrayPromise
Is to make your code have less callback!

## GitHub
https://github.com/NekoMaru76/endlessArrayPromise

## Example
```js
const EndlessArrayPromise = require(`${__dirname}/index.js`);
const endlessArrayPromise = new EndlessArrayPromise(async function() {
	for await (let promise of this.get()) {
		console.log(promise);
	}
});

setInterval(() => {
	endlessArrayPromise.add(0);
}, 100);
```

## Usage and Example

### new EndlessArrayPromise(callback?)

Parameters:
- callback {Function}
	Run this function when the class is ready
	
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