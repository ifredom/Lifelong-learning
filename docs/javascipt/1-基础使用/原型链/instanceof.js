/**
 * !  instanceof 和 typeof
 * @description
 * @argument
 * [变量类型](https://juejin.cn/post/6844903613584654344)
 * js 在底层存储变量的时候，会在变量的机器码的低位1-3位存储其类型信息👉
  000：对象
  010：浮点数
  100：字符串
  110：布尔
  1：整数
  but, 对于 undefined 和 null 来说，这两个值的信息存储是有点特殊的。
null：所有机器码均为0
undefined：用 −2^30 整数来表示
所以，typeof 在判断 null 的时候就出现问题了，由于 null 的所有机器码均为0，因此直接被当做了对象来看待。

 */
let s = new Boolean("true");

let v = false;
console.log(s);

console.log(s === true);

console.log(typeof s);
console.log(typeof v);

var x = Object.prototype.toString.call("");
console.log(x);
