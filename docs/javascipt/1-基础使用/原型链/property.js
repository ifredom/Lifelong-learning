/**
 * 我们先来了解下面引用类型的四个规则：
1、引用类型，都具有对象特性，即可自由扩展属性。
2、引用类型，都有一个隐式原型 __proto__ 属性，属性值是一个普通的对象。
3、引用类型，隐式原型 __proto__ 的属性值指向它的构造函数的显式原型 prototype 属性值。
4、当你试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么它会去它的隐式原型 __proto__ 中寻找。
 */

function Foo() {
  return this;
}
Foo.getName = function () {
  console.log("1");
};
Foo.prototype.getName = function () {
  console.log("2");
};

var obj1 = new Foo(); // -> 1
var obj2 = new Foo(); // -> 1

console.log(obj1.__proto__);
console.log(obj2.__proto__);
console.log(obj1.__proto__ === obj2.__proto__);
console.log(obj1.__proto__ === Foo.prototype);
