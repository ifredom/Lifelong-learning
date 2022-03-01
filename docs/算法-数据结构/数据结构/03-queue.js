/**
 * ! Queue队列
 * * 具象：排队购物，先排队的人先买到，后排的人后买到
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

/**
 * 测试题：击鼓传花
 * 几个人围成一圈，从某一个人开始数数，，数到指定数字的人被淘汰。
 * 接下来又下一个人继续从头开始数数，直到最后一人胜出
 * 问：最终胜利的那个人是谁
 */
var passFlow = function (nameList, num) {
  var queue = new Queue();
  for (let index = 0; index < nameList.length; index++) {
    const element = nameList[index];
    queue.enqueue(element);
  }
  console.log(queue);

  for (let index = 0; index <= num - 1; index++) {
    queue.enqueue(queue.dequeue());
  }
  queue.dequeue();
  console.log(queue);
};
const nameList = ["TOM", "jack", "tony", "farry"];
var velocity = passFlow(nameList, 2);
console.log(velocity);
/**
 * *应用：广度优先搜索算法
 */
