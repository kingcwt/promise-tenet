// 函数颗粒化

//判断变量的类型
// 常用的判断类型的方法4 种

// 1 typeof 不能判断对象类型 typeof [] typeof {}
// 2 constructor 可以找到这个变量是通过谁构造出来的
// 3 instanceof 判断谁是谁的实例 __proto__
// 4 Object.prototype.toString.call()  缺陷不能细分谁是谁的实例

//Object.prototype.toString.call({})
// "[object Object]"

// function isType(type,value){
//     return Object.prototype.toString.call(value) ===`[object ${type}]`;
// };

//

// function isType(type) {
//     return function (value) {
//         return Object.prototype.toString.call(value) === `[object ${type}]`;
//     }
// };

// let isArray = isType('Array')
// console.log(isArray([]))
// 通过一个柯里化函数 实现通用的柯里化方法
function isType(type,value){
    return Object.prototype.toString.call(value) ===`[object ${type}]`;
};
const curring = (fn,arr=[]) => {
    let len = fn.length;
    return function(...args){// 高阶函数
         let r = [...arr,...args];
         if(r.length<len){
             return curring(fn,r);
         }else{
             return fn(...r);
         }
    }
}

let isArray = curring(isType)('Array');
let isString = curring(isType)('String');
console.log(isArray([]))
console.log(isArray({}))
console.log(isString('123'))





// function sum(a, b, c, d, e, f) {
//     return a + b + c + d + e + f;
// }
// let r = sun(1, 2)(3, 4)(5)(6);