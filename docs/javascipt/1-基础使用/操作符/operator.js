/**
 * ! 操作符 ==
 * 1. 在条件判断时，除了 undefined， null， false， NaN， ''， 0， -0，
 * 其他所有值都转为 true，包括所有对象
 */

// [] 转成 true，然后取反变成 false
console.log([] == false);
console.log([] == true);

/**
 * ! 比较运算符
 * 1. 如果是对象，就通过 toPrimitive 转换对象
 * 2. 如果是字符串，就通过 unicode 字符索引来比较原型
 */
