# 原生数据

> https://www.30secondsofcode.org/articles/s/js-native-data-structures

> 8 种基本数据类型：null , undefined, number, string, boolean, object, symbol, bigint

## Undefined 与 Null 的区别

> Undefined 与 null 的值相等，但类型不相等：

```bash
typeof undefined              // undefined
typeof null                   // object
null === undefined            // false
null == undefined             // true
```

## symbol

> 语法： var obj = Symbol("decript");  
> 类型: typeof obj; // "symbol"
> 参数： Symbol 仅有一个可选参数:描述. 描述属性仅用于标注解释，不能用于引用

- Symbol 不可使用 new 显式包装该对象 。比如，这是错误得：`new Symbol("hello symbol");`对于其他得基本类型，由于历史原型可是用 new Boolean、new String 以及 new Number 创建得.
- 创建全局共享对象，Symbol.for(key) 和 Symbol.keyFor(sym)。 默认先从全局进行索引，找到则返回，没找到则创建

## [Map 和 Objets 区别](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
