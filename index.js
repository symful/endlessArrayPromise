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
    delete(promise = this.promises[0]) {
      return this.promises.splice(this.promises.indexOf(promise), 1);
    }
    reset() {
        this.arrays = [];
        this.promises = [];
    }
    add(value) {
        this.init();
        
        return this.end(value);
    }
    end(value) {
        if (!this.arrays.length) throw new Error("Reset the array with `.reset()` first!");

        this.arrays.splice(0, 1)[0].resolve(value);
        this.delete();
    }
    error(error) {
        if (!this.arrays.length) throw new Error("Reset the array with `.reset()` first!");

        this.arrays.splice(0, 1)[0].reject(error);
        this.delete();
    }
    [Symbol.asyncIterator]() {
        return {
            next: async() => {
                try {
                    const promise = this.promises[0];

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