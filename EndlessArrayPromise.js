const wait = callback => new Promise(async(resolve, reject) => {
    try {
        if (!await callback()) setTimeout(() => wait(callback).then(resolve).catch(reject));
        else resolve();
    } catch(e) {
        reject(e);
    }
});

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
            before: null,
            async next() {
                try {
                    if (this.before) await this.before;
                    if (self.ended && self.index <= this.index) return Promise.resolve({ value: null, done: true });

                    await wait(() => !self.ended && self.index > this.index);

                    this.before = self.promises[this.before ? this.index++ : this.index];
                    const value = await self.promises[this.index];

                    return Promise.resolve({
                        value: value || null,
                        done: false
                    });
                } catch(e) {
                    Promise.reject(e);
                }
            }
        }
    }
};
