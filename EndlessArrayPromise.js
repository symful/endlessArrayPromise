const wait = callback => new Promise(async (resolve, reject) => {
    try {
        if (!await callback()) setTimeout(() => wait(callback).then(resolve).catch(reject));
        else resolve();
    } catch(e) {
        reject(e);
    }
});

module.exports = class EndlessArrayPromise {
    constructor() {
        this.values = [];
        this.index = 0;
        this.ended = false;
    }
    delete() {
        this.ended = true;
    }
    add(value) {
        this.values.push(value);

        this.index++;
    }
    end(value) {
        this.values.push(value);
        this.delete();
    }
    [Symbol.asyncIterator]() {
        const self = this;

        return {
            index: this.index,
            async next() {
                try {
                    if (this.before) await this.before;
                    if (self.ended && self.values.length <= this.index) return Promise.resolve({ value: null, done: true })
                    
                    await wait(() => self.values.length > this.index);

                    return Promise.resolve({
                        value: self.values[this.index++],
                        done: false
                    });
                } catch(e) {
                    Promise.reject(e);
                }
            }
        }
    }
};
