# 原型链

我们先来了解下面引用类型的四个规则：

- 1、引用类型，都具有对象特性，即可自由扩展属性。
- 2、引用类型，都有一个隐式原型 **proto** 属性，属性值是一个普通的对象。
- 3、引用类型，隐式原型 **proto**  的属性值指向它的构造函数的显式原型 prototype 属性值。
- 4、当你试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么它会去它的隐式原型 **proto** 中寻找。

## 类型检测

> 使用 instanceof 检测 自定义类型:

```js
var ClassFirst = function () {};
var ClassSecond = function () {};
var instance = new ClassFirst();
typeof instance; // object
typeof instance == "ClassFirst"; // false
instance instanceof Object; // true
instance instanceof ClassFirst; // true
instance instanceof ClassSecond; // false
```

> 使用 typeof 检测简单类型 :**检测基本类型，不包括 null，数组，map ，object**

```js
typeof a === 'undefined'; // true

'example string' instanceof String; // false
typeof 'example string' == 'string'; // true

'example string' instanceof Object; // false
typeof 'example string' == 'object'; // false

true instanceof Boolean; // false
typeof true == 'boolean'; // true

99.99 instanceof Number; // false
typeof 99.99 == 'number'; // true

function() {} instanceof Function; // true
typeof function() {} == 'function'; // true
```

> 使用 instanceof 检测复杂类型:

```js
/regularexpression/ instanceof RegExp; // true
typeof /regularexpression/; // object

[] instanceof Array; // true
typeof []; //object

{} instanceof Object; // true
typeof {}; // object
```

> 最后一个有点独特:

```js
typeof null; // object
```

### typeof

总结一下：

- 1.对于基本类型，除 null 以外，均可以返回正确的结果。
- 2.对于引用类型，除 function 以外，一律返回 object 类型。
- 3.对于 null ，返回 object 类型。
- 4.对于 function 返回 function 类型。

### instanceof

> instanceof 是用来判断 A 是否为 B 的实例

核心就是理解这一行

```js
function Parent() {}
Parent.prototype.__proto__ === Object.prototype;
```

### 拓展阅读资料

[the difference between typeof and instanceof and when should one be used vs. the other?](https://stackoverflow.com/questions/899574/what-is-the-difference-between-typeof-and-instanceof-and-when-should-one-be-used)

[](http://jartto.wang/2019/01/17/js-typeof/)
