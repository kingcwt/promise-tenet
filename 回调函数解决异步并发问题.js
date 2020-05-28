// 多个异步请求 如何同时获取最终结果

let fs = require('fs');

let school = {};

// let index = 0;
// const cb=()=>{
//     if(++index ===2){
//         console.log(school)
//     }
// }


// 什么叫闭包 核心理解 => 函数的定义的作用域和函数执行的作用域 不在同一个作用域下
function after(times, callback) {
    return function () { // 闭包函数
        if (--times == 0) {
            callback();
        }

    }
}

let cb = after(2, function () {
    console.log(school)
})

fs.readFile('./name.txt', 'utf-8', function (err, data) {
    console.log(data)
    school.name = data;
    cb();
})

fs.readFile('./age.txt', 'utf-8', function (err, data) {
    console.log(data)
    school.age = data;
    cb()
})

