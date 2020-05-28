
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'
const resolvePromise = (promise2, x, resolve, reject) => {
    console.log(promise2, x, resolve, reject);
}
class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks = []; //存放成功回调
        this.onRejectedCallbacks = []; //存放失败回调
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value;
                this.status = RESOLVED;
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject);//立即执行
        } catch (e) {
            reject(e);
        }
    }
    then(onFulfilled, onRejected) {
        let promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0)

            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(promise2, x, resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                }, 0)

            }
            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    //todo...

                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)

                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(promise2, x, resolve, reject);
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)

                })
            }


        });
        return promise2;
    }
}

module.exports = Promise;