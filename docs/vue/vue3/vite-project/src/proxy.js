// 实现一个继承extend
// Object.prototype 属性表示 Object 的原型对象，也叫作原型类
function extend(sup, base) {
  var descriptor = Object.getOwnPropertyDescriptor(
    base.prototype,
    "constructor"
  );

  var su = sup.prototype;
  console.log(su);
  console.log(descriptor);
  base.property = sup.prototype;
  var handle = function (obj, prop, value) {};
  var proxy = new Proxy(base, handle);
  descriptor.value = proxy;
  return proxy;
}
var Person = function (name) {
  this.name = name;
};

var Boy = extend(Person, function (name, age) {
  this.age = age;
});

var tom = new Boy("tom", 23);

console.log(tom.name);
console.log(tom.age);
