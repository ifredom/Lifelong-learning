/**
 * Stack栈
 * ? 后进先出 LIFO (last in, first out)的示意
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
