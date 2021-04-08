module.exports = class EndlessArrayPromise {
	constructor() {
		this.arrays = [];
		this.promises = [];
		
		this.init();
	}
	init() {
		const promise = new Promise((resolve, reject) => {
			this.arrays.push({ resolve, reject });
		});
		
		this.promises.push(promise);
	}
	add(value) {
		this.init();
		
		return this.end(value);
	}
	end(value) {
		this.arrays.splice(0, 1)[0].resolve(value);
	}
	error(e) {
		this.arrays.splice(0, 1)[0].reject(e);
	}
	get() {
		return this.promises;
	}
};