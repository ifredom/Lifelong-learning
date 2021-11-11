# float

BFC 所属子元素，垂直方向，根据其高度排列，而不是 dom 节点顺序

## 清除

清除浮动的关键字是 clear，官方定义如下(这个规则只能影响使用清除的元素本身，不能影响其他元素)：

语法：
clear : none | left | right | both

取值：
none : 默认值。允许两边都可以有浮动对象
left : 不允许左边有浮动对象
right : 不允许右边有浮动对象
both : 不允许有浮动对象

```css
.clearfix:after {
  display: block;
  content: "";
  clear: both;
  height: 0;
}
```

### 参考

[图文详解 Float](https://blog.csdn.net/qq_36595013/article/details/81810219)
