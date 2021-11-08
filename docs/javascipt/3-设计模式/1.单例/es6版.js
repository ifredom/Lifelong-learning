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

class SingletonA {
  static _instance;
  name;
  constructor() {
    this.name = "setting";
  }

  static getInstance() {
    if (this._instance == null) {
      this._instance = new SingletonA();
    }
    return this._instance;
  }
  printInfo() {
    console.log(`SingletonA 调用  ${this.name}`);
  }
}

class User {
  instanceA;
  constructor() {
    this.instanceA = SingletonA.getInstance();
  }
}

// 调用
const singleton = new SingletonA();
// 外部调用 getInstance() 获取实例
var x = SingletonA.getInstance();
var y = SingletonA._instance;

singleton.printInfo();
console.log(singleton);
console.log(x === y);

var user = new User();
console.log(y === user.instanceA);
