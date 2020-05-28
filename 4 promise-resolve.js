
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'
const resolvePromise = (promise2, x, resolve, reject) => {
    let called;
    // 1 循环引用 自己等待自己完成 错误的实现 用一个类型错误 结束掉promise
    if (promise2 === x) return reject(new TypeError('chaining cycle detected for promise #<promise> kingcwt'))
    // 后续条件要严格判断 保证代码和别的库一起使用
    if ((typeof x === 'object' && x != null) || typeof x === 'function') {
        //有可能是promise
        try {
            let then = x.then;
            if (typeof then === 'function') {
                //认为是一个promise  x.then可能会再次取值
                then.call(x, y => { //根据promise的状态决定成功还是失败
                    // resolve(y);
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, e => {
                    if (called) return;
                    called = true;
                    reject(e);
                });

            } else { //{then:23}
                resolve(x)
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);//取值出错

        }

    } else {
        resolve(x);
    }
    console.log(promise2, x, resolve, reject, '<----');
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