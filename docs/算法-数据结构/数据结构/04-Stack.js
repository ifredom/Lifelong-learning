/**
 * !Stack栈
 * * 具象：叠罗汉，先叠的人起不来，后叠的人先起来
 * ? 后进先出 LIFO (last in, first out)
 * push(element):添加一个或是几个新元素到栈顶。
 * pop():移除栈顶的元素，同时返回被移除元素。
 * peek():返回栈顶的元素，但并不对栈顶的元素做出任何的修改。
 * isEmpty():检查栈内是否有元素，如果有返回true，没有返回false。
 * clear():清除栈里的元素。
 * size():返回栈的元素个数。
 * print():打印栈里的元素。
 */
class Stack {
  constructor() {
    this.list = [];
  }

  push(element) {
    this.list.push(element);
  }
  pop() {
    return this.list.pop();
  }
  peek() {
    return this.list[this.length - 1];
  }
  isEmpty() {
    return this.list.length <= 0;
  }
  clear() {
    this.list = [];
  }
  size() {
    return this.list.length;
  }
  print() {
    console.log(this.list.toString());
  }

  toString() {
    return this.list.toString();
  }
}

var stack = new Stack();
stack.push(1);
stack.push(3);
stack.push(5);
stack.print();

/**
 * 测试题：
 * 有六个元素 A,B,C,D,E,F，哪一种不是一个合法的出栈队列(C)
 * A. B,C,D,A,F,E
 * B. C,B,D,E,F,A
 * C. D,C,A,B,E,F
 * D. E,D,C,F,B,A
 */

// 应用题：十进制转换成二进制

function dec2bin(decNumber) {
  var stack = new Stack();

  while (decNumber > 0) {
    stack.push(decNumber % 2);
    decNumber = Math.floor(decNumber / 2);
  }
  var binaryString = "";
  while (!stack.isEmpty()) {
    var node = stack.pop();
    binaryString += node;
  }
  return binaryString;
}

console.log(dec2bin(10));
console.log(dec2bin(100));
console.log(dec2bin(1000));

/**
 * *应用示例 :深度优先搜索算法
 * （ AB（ C（ DE） F）（ G（（ H） I J） K）） 这一串字符中括号的处理方式
如下：首先从左边开始读取字符，读到左括号就将其入栈，读到右括号就将栈顶的左括
号出栈。此时，出栈的左括号便与当前读取的右括号相匹配。通过这种处理方式，我们
就能得知配对括号的具体位置。
 */
