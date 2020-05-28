
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'
const PENDING = 'PENDING'
class Promise {
    constructor(executor) {
        this.status = PENDING;
        this.value = undefined;
        this.reason = undefined;
        this.onResolvedCallbacks= []; //存放成功回调
        this.onRejectedCallbacks=[]; //存放失败回调
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.value = value;
                this.status = RESOLVED;
                this.onResolvedCallbacks.forEach(fn=>fn())
            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.reason = reason;
                this.status = REJECTED;
                this.onRejectedCallbacks.forEach(fn=>fn())
            }
        }
        try {
            executor(resolve, reject);//立即执行
        } catch (e) {
            reject(e);
        }
    }
    then(onFulfilled, onRejected) {
        if (this.status === RESOLVED) {
            onFulfilled(this.value);
        }
        if (this.status === REJECTED) {
            onRejected(this.reason);
        }
        if(this.status === PENDING){
            this.onResolvedCallbacks.push(()=>{
                //todo...
                onFulfilled(this.value);
            })
            this.onRejectedCallbacks.push(()=>{
                onRejected(this.reason);
            })
        }
    }
}

module.exports = Promise;