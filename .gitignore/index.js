module.exports = class EndlessArrayPromise {
	constructor(callback) {
		this.arrays = [];
		this.promises = [];
		
		this.init(callback);
	}
	init(callback) {
		const promise = new Promise((resolve, reject) => {
			this.arrays.push({ resolve, reject });
		});
		
		this.promises.push(promise);
		
		if (typeof callback === "function") callback.bind(this)();
		
		return promise;
	}
	add(value) {
		this.init(() => {
			this.arrays[this.arrays.length-2].resolve(value);
		});
	}
	end(value) {
		this.arrays[this.arrays.length-1].resolve(value);
	}
	error(e) {
		this.arrays[this.arrays.length-1].reject(e);
	}
	get() {
		return this.promises;
	}
};