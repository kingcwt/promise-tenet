// promise 特点及概念
// https://promisesaplus.com/
// primise 为什么产生 解决异步问题

// 1 多个异步请求并发 （希望同步获取最终结果）
// 2 链式异步请求的问题 上一个的输出是下一个的输入 promise 链式调用可以解决
// 3 还是基于回调的
// promise 三个状态  成功 success 失败 reject 等待 pending

//---
//发布订阅模式 如果当前状态是pending时 我们需要将成功的回调和失败的回调存放起来 稍后调用resolve
let Promise = require('./promise');
let promise =new Promise((resolve,reject)=>{
    setTimeout(()=>{
    reject('成功')
    },2000)
})


promise.then((data)=>{
    console.log('success',data)
},(err)=>{
    console.log('err',err)
})
promise.then((data)=>{
    console.log('success',data)
},(err)=>{
    console.log('err',err)
})