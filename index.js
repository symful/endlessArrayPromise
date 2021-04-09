module.exports = class EndlessArrayPromise {
    constructor() {
        this.arrays = [];
        this.promises = [];

        this.init();
    }
    init() {
        this.promises.push(new Promise((resolve, reject) => {
            this.arrays.push({
                resolve,
                reject
            });
        }));
    }
    reset() {
        this.arrays = [];
        this.promises = [];

        this.init();
    }
    add(value) {
        this.init();
        
        this.arrays[this.arrays.length-2].resolve(value);
    }
    end(value) {
        this.arrays[this.arrays.length-1].resolve(value);
        this.reset();
    }
    error(error) {

        this.arrays[this.arrays.length-1].reject(error);
        this.reset();
    }
    [Symbol.asyncIterator]() {
        return {
            i: 0,
            promises: this.promises,
            async next() {
                try {
                    const promise = this.promises[this.i++];

                    return Promise.resolve({
                        value: await promise,
                        done: !promise
                    });
                } catch (e) {
                    Promise.reject(e);
                }
            }
        }
    }
};