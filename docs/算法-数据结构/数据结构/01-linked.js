/**
 * !Linked链表
 * ? 在计算机科学中, 一个 链表 是数据元素的线性集合, 元素的线性顺序不是由它们在内存中的物理位置给出的。 相反, 每个元素指向下一个元素。它是由一组节点组成的数据结构,这些节点一起,表示序列。
 * ? 在链表中，数据的添加和删除都较为方便，就是访问比较耗费时间
 * insert():插入   (插队方式：insertNodeByHead头插法，尾插法，指定位置插入)
 * search(): 搜索
 * remove(): 删除
 * interator(): 遍历
 * reverseInterator(): 反向遍历
 *
 */

class Node {
  constructor(value) {
    this.data = value;
    this.next = null;
  }
}

class Linked {
  constructor() {
    const node = new Node(null);
    this.head = node;
    this.tail = node;
    this.length = 0;
  }

  // https://juejin.cn/post/6844903498362912775
  insert(value) {
    // 1.创建一个新节点
    const node = new Node(value);
    if (this.head === null) {
      // head 和 tail 都指向同一个对象，这一点很重要
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node; // 由于head 和tail 都指向同一个对象，tail的变化都会导致head对象的变化，这是JS 中对象的工作方式
    }

    this.length++;
    return true;
  }
  // 头插法>
  insertNodeByHead(value) {
    const node = new Node(value);
    node.next = this.head.next;
    this.head.next = node;
    this.length++;
  }
  // 尾插法>
  insertNodeByTail(value) {
    const node = new Node(value);
    // 将尾指针的 next 指向被插入的节点
    this.tail.next = node;
    // 让尾指针指向被插入的节点
    this.tail = node;
    // 增加size
    this.length++;
  }

  remove() {}
}

var linked = new Linked();
linked.insertNodeByHead("a");
linked.insertNodeByHead("b");
linked.insertNodeByHead("c");
linked.insertNodeByHead("d");
console.log(linked); // head->d->c->b->a

var linkedTail = new Linked();
linkedTail.insertNodeByTail("a");
linkedTail.insertNodeByTail("b");
linkedTail.insertNodeByTail("c");
linkedTail.insertNodeByTail("d");
console.log(linkedTail); // head->d->c->b->a
