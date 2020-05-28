// 发布订阅模式 主要分成两部分  on emit
// on 就是把一些函数维护到一个数组中
// emit 就是让数组中的方法依次执行


let fs = require('fs');

let school = {};

let event = { //订阅和发布没有明显的关联
    arr: [],
    on(fn) {
        this.arr.push(fn);
    },
    emit() {
        this.arr.forEach(fn => fn());
    }
}

event.on(function () {
    console.log('读取完毕')
})
event.on(function () {
    console.log('读取完毕')
    if(Object.keys(school).length==2){
        console.log(school,'chr');
    }
})
fs.readFile('./name.txt', 'utf-8', function (err, data) {
    console.log(data)
    school.name = data;
    event.emit();
})

fs.readFile('./age.txt', 'utf-8', function (err, data) {
    console.log(data)
    school.age = data;
    event.emit();
})