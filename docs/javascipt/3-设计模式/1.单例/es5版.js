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

function SingletonA() {
  this.isPlaying = true;
  this._instance = null;
}
SingletonA._instance = null;
SingletonA.getInstance = function () {
  if (this._instance === null) {
    this._instance = new SingletonA();
  }
  return this._instance;
};

SingletonA.prototype.printInfo = function () {
  console.log(`SingletonA 调用  ${this.isPlaying}`);
};

// 调用
const singleton = new SingletonA();
var x = SingletonA.getInstance();
var y = SingletonA._instance;

singleton.printInfo();
console.log(singleton);
console.log(x === y);
