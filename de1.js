
let Promise =require('./de2');

let fs = require('fs');
let school = {};
function read(filename) {

    return new Promise((resolve, reject) => {
        // resolve('第一个then')
        fs.readFile(filename, 'utf8', (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}
read('./name.txt').then(data => {
    school.name = data;
    // return read(data);
    console.log(data,'成功  then')
    return read(data)

},err=>{
    // return read('./name.txt')
    console.log(err,'错误 then')
    return 2
})
.then(res => {
    // school.age = res;
    // console.log(school)
    console.log(res,'成功then 2')
},err=>{
    console.log(err,'错误then 2')
})


