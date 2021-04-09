module.exports = class EndlessArrayPromise {
    constructor() {
        this.arrays = [];
        this.promises = [];
        this.index = 0;
        this.iterator = {
            next: async () => {
                if (!this.promises) return Promise.resolve({ done: true, value: null });

                try {
                    const promise = this.promises[this.index];

                    return Promise.resolve({
                        value: await promise,
                        done: !promise
                    });
                } catch (e) {
                    Promise.reject(e);
                }
            }
        }

        this.init();
    }
    delete() {
        this.arrays = this.promises = this.index = this.iterator = null;
    }
    init() {
        this.promises.push(new Promise((resolve, reject) => {
            this.arrays.push({
                resolve,
                reject
            });
        }));
    }
    add(value) {
        this.index++;

        this.init();
        this.arrays[this.arrays.length-2].resolve(value);
    }
    end(value) {
        this.arrays[this.arrays.length-1].resolve(value);
        this.delete();
    }
    error(error) {
        this.arrays[this.arrays.length-1].reject(error);
        this.delete();
    }
    [Symbol.asyncIterator]() {
        return this.iterator;
    }
};