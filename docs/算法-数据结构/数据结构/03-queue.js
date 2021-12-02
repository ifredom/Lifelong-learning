/**
 * Queue队列
 * ? 先进先出 FIFO (first in, first out)的示意
 * enqueue(element):向队列尾部添加一个（或是多个）元素。
 * dequeue():移除队列的第一个元素，并返回被移除的元素。
 * front():返回队列的第一个元素——最先被添加的也是最先被移除的元素。队列不做任何变动。
 * isEmpty():检查队列内是否有元素，如果有返回true，没有返回false。
 * size():返回队列的长度。
 * print():打印队列里的元素。
 */
class Queue {
  constructor() {
    this.list = [];
  }
  enqueue(element) {
    this.list.push(element);
  }
  dequeue() {
    return this.list.shift();
  }
  front() {
    return this.list[0];
  }
  isEmpty() {
    return this.list.length <= 0;
  }
  size() {
    return this.list.length;
  }
  print() {
    console.log(this.list.toString());
  }
}

var queue = new Queue();
queue.enqueue(1);
queue.enqueue(3);
queue.enqueue(5);

queue.dequeue();

queue.print();
