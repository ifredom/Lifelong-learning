/**
 * @class MusicEngine
 * !单例模式
 * * 1.实例只会创建一次，永远返回同一个实例
 * * 2.实例是私有属性，不能被外部访问
 * * 3.外部只能通过调用静态方法 getInstance() 获取其实例
 * ? ES6缺陷 定义的私有属性 _instance 依然可以被外部访问 @object {y}
 * TODO: 作者: ifredom
 * TODO: 创建时间  2021-11-08 21:40:13
 */

// 单例构造函数
function SingletonA(name) {
  this.name = name;
}

// 获取实例的名字
SingletonA.prototype.printName = function () {
  console.log(this.name);
};

// 单例对象
var Singleton = (function () {
  var instance;

  return function (name) {
    if (!instance) {
      instance = new SingletonA(name);
    }
    return instance;
  };
})();

// 调用
var singletonA = new Singleton("A");
var singletonB = new Singleton("B");

singletonA.printName();
singletonB.printName();

console.log(singletonA === singletonB);
