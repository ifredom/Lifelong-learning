# 如何设计 CSS

> 从设计 css 的角度去理解 BFC

## BFC 是什么?

> BFC :块级格式上下文（Block Formatting Context），是一个独立的作用域 context（一个创造出来的结界空间）。

> 普通流其实就是指 BFC 中的 FC。FC(Formatting Context)，直译过来是格式化上下文，它是页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用。常见的 FC 有 BFC、IFC，还有 GFC 和 FFC。

## 为什么？

css 直译为样式，设计它的目的是为了修饰 HTML 文档结构,因此 `如何设计css？`可以类比理解为 `对一栋建筑如何设计?` 的角度去思考。

因此，首先

> 1. 结构。css 将其结构分为 3 中，并取了一个更为专业的名称：`流`，也就是常说的文档流的分类：定位流、浮动流、普通流三种结构。其内部由一个又一个的 BFC 区域拼合而成。（比如建筑可以分为砖木结构、砖混结构、钢筋混凝土结构和钢结构四大类。） css 规定了以下几种创建 BFC 结构的方式，也可以称之为触发方式。

1. 根元素，即 HTML 标签
2. 浮动元素：float 值为 left、right
3. overflow 值不为 visible，为 auto、scroll、hidden
4. display 值为 inline-block、table-cell、table-caption、table、inline-table、flex、inline-flex、grid、inline-grid
5. 定位元素：position 值为 absolute、fixed

- 比如使用了 `<html></html>`标签，那么 html 内部就创建了一个 BFC 区域，对某一个 dom 节点使用了 float，那么该 dom 节点内部也创建了一个 BFC 区域.BFC 区域是层层嵌套，一个 BFC 包含另一个.

> 2. 组成部分。确定结构后，大的框架就有了，接下来就设计细则，使用什么材料将这个结构搭建起来。css 设计为`所有的行内元素和块级元素都可以作为其组成部分`。（比如对于钢筋混泥土结构建筑，其组成有普通钢筋，预应力筋，预应力螺纹钢筋，有强度 15 混凝土，有强度 80 混凝土...）
>
> 3. 如何组装内部成分。css 对 BFC 区域的有这些约束规则：

1. BFC 区域内部的子节点在垂直方向上一个接一个向下排列
2. BFC 区域内部的子节点垂直方向上的距离由 margin 决定。（完整说法：属于同一个 BFC 的两个相邻 Box 的 margin 会发生折叠，不同 BFC 不会发生折叠。）
3. 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（这说明 BFC 中子元素不会超出他的包含块，而 position 为 absolute 的元素可以超出他的包含块边界）
4. 计算 BFC 的高度时，浮动子元素也参与计算

### 3 种文档流

- **常规流(Normal flow)**

* 在常规流中，盒一个接着一个排列;
* 在块级格式化上下文里面， 它们竖着排列；
* 在行内格式化上下文里面， 它们横着排列;
* 当 position 为 static 或 relative，并且 float 为 none 时会触发常规流；
* 对于静态定位(static positioning)，position: static，盒的位置是常规流布局里的位置；
* 对于相对定位(relative positioning)，position: relative，盒偏移位置由 top、bottom、left、right 属性定义。即使有偏移，仍然保留原有的位置，其它常规流不能占用这个位置。

- **浮动(Floats)**

* 左浮动元素尽量靠左、靠上，右浮动同理
* 这导致常规流环绕在它的周边，除非设置 clear 属性
* 浮动元素不会影响块级元素的布局
* 但浮动元素会影响行内元素的布局，让其围绕在自己周围，撑大父级元素，从而间接影响块级元素布局
* 最高点不会超过当前行的最高点、它前面的浮动元素的最高点
* 不超过它的包含块，除非元素本身已经比包含块更宽
* 行内元素出现在左浮动元素的右边和右浮动元素的左边，左浮动元素的左边和右浮动元素的右边是不会摆放浮动元素的

- **绝对定位(Absolute positioning)**

* 绝对定位方案，盒从常规流中被移除，不影响常规流的布局；
* 它的定位相对于它的包含块，相关 CSS 属性：top、bottom、left、right；
* 如果元素的属性 position 为 absolute 或 fixed，它是绝对定位元素；
* 对于 position: absolute，元素定位将相对于上级元素中最近的一个 relative、fixed、absolute，如果没有则相对于 body；

#### 参考

[BFC](https://juejin.cn/post/6844903641485148173)
[混凝土结构设计规范](https://www.soujianzhu.cn/NormAndRules/NormContent.aspx?id=234)
