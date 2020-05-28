const PENDING = 'PENDING';
const RESOLVE = 'RESOLVE';
const REJECT = 'REJECT';
const resolvePromise = (promise2, x, resolve, reject) => {
    let called;
    if (promise2 === x) return reject(new TypeError('chaining cycle detected for promise #<promise> kingcwt'))
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, e => {
                    if (called) return;
                    called = true;
                    reject(e);
                })
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            reject(e);
        }
    } else {
        resolve(x);
    }
}
class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallBacks = [];
        this.onRejectedCallBacks = [];
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = RESOLVE;
                this.value = value;
                this.onResolvedCallBacks.forEach(fn => fn())
            }
        };

        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECT;
                this.reason = reason;
                this.onRejectedCallBacks.forEach(fn => fn())
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            REJECT(e);
        }
    }
    then(onFulfilled, onRejected) {
        let promise2 = new Promise((resolve, reject) => {
            //注意：
            //1 then函数里 不管是onFulfilled,还是onRejected 只要返回的不是promise 是普通值
            // 都会进入下一次then的onFulfilled里
            //2 如果throw err 一定会走到下一次then的onRejected
            //3 promise情况：
            // 会采用promise状态 根据状态决定下一次的成功还是失败
            //4 错误处理： 如果离自己最近的then 没有错误处理 会向下找
            // - 不是错误 不是promise 就是普通值
            if (this.status === PENDING) {
                this.onResolvedCallBacks.push(() => {
                    let x = onFulfilled(this.value)
                    resolvePromise(promise2,x,resolve,reject);
                })
                this.onRejectedCallBacks.push(() => {
                    let x = onRejected(this.reason);
                    resolvePromise(promise2,x,resolve,reject);
                })
            }
            if (this.status === RESOLVE) {
                let x = onFulfilled(this.value);
                resolvePromise(promise2,x,resolve,reject);
            }
            if (this.status === REJECT) {
                let x = onRejected(this.reason);
                resolvePromise(promise2,x,resolve,reject);
            }

        })
        return promise2;
    }

}


module.exports = Promise;