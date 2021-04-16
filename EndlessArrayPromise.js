module.exports = class EndlessArrayPromise {
    constructor() {
        this.arrays = [];
        this.promises = [];
        this.index = 0;
        this.ended = false;

        this.init();
    }
    delete() {
        this.ended = true;
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
            async next() {
                const { promises, index, ended } = self;

                if (ended && index <= this.index) return Promise.resolve({ value: null, done: true });

                try {
                    const promise =  promises[this.index >= promises.length && !ended ? this.index : this.index++];
                    const value = await promise;

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
