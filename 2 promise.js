let fs = require('fs');
let Promise = require('./4 promise-resolve');
function read(filename) {

    return new Promise((resolve, reject) => {
        // resolve('第一个then')
        resolve('第一个then- resolve')
        // fs.readFile(filename, 'utf8', (err, data) => {
        //     if (err) reject(err);
        //     resolve(data);
        // })
    })
}

// promise 成功和失败的回调的返回值 可以传递到外层的下一个then
// 如果返回的是普通值的花 （传递到下一次的成功中） 出错的情况（一定会走到下一次的失败 throw error）  可能还有promise的情况(采用promise的状态 决定走下一次的成功还是失败)
// read('./name.txt').then((data) => {
//     console.log(data)
//     return read(data);
// }, err => {
//     console.log(err)
//     // return err;
//     throw new Error('错误')
// }).then(data=>{

//     console.log('-----',data)
// },err=>{
//     console.log(err)
// })




read('./name.txt').then(data => {
    // return 1;
    // return new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         resolve('ok')
    //     }, 1000)
    // })
    // return 100、
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve('success--')
        },2000)
    })
}, err => {

    // console.log(err, '失败')
    // return '失败'
    // throw new Error('chr')
    return 200
}).then(res => {
    console.log(res, 'yes')
}, errt => {
    console.log(errt, '第二个then - ', errt);
})





//error first  异步方法无法通过try catch捕获异常
// fs.readFile('./name.txt','utf8',(err,data)=>{
//     fs.readFile(data,'utf8',(err,data)=>{
//         if(err){

//         }
//         console.log(data)
//     })
// })