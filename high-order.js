
function say(a,b) {
  console.log('say',a,b);
}

// 给某个方法 添加一个方法在它执行之前调用
Function.prototype.before = function (callback) {
  return (...args) => { //剩余运算符
    callback();
    this(...args);
  }
}

let beforeSay = say.before(function () {
  console.log('before say');
})

beforeSay('hello','world');