/**
 * !双向链表
 * ?链表里的每个数据都只有一个指针，但我们可以把指针设定为两个，并且让它们分别指向前后数据，这就是“双向链表”。
 * ?使用这种链表，不仅可以从前往后，还可以从后往前遍历数据，十分方便。
 * ?但是，双向链表存在两个缺点：一是指针数的增加会导致存储空间需求增加；是
 * ?二添加和删除数据时需要改变更多指针的指向。
 */
class DoublyLink {
  constructor(node, prevLink, nextLink) {
    this.node = node;
    this.prevLink = prevLink;
    this.nextLink = nextLink;
  }
}
