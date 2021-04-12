module.exports = class EndlessArrayPromise {
    constructor() {
        this.arrays = [];
        this.promises = [];
        this.index = 0;
        this.last;

        this.init();
    }
    delete() {
        this.last = this.promises[this.promises.length-1];

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
        const self = this;

        return {
            index: this.index,
            last: false,
            async next() {
                const { promises, last, index } = self;

                if (!promises) {
                    if (this.last) return Promise.resolve({ done: true, value: null });
                    else {
                        this.last = true;

                        return Promise.resolve({ done: false, value: last });
                    }
                }

                try {
                    const promise =  promises[this.index > promises.length-1 ? this.index : this.index++];
                    const value = await promise;

                    if (this.index >= promises.length) this.last = true;

                    return Promise.resolve({
                        value: value,
                        done: !promise
                    });
                } catch (e) {
                    Promise.reject(e);
                }
            }
        }
    }
};