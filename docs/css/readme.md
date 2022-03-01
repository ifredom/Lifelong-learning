# css

1.[BFC](https://juejin.cn/post/6844903641485148173) :块级格式上下文（Block Formatting Context）

## CSS 权重和优先级

- !important > 内联样式 > 外联样式 | 结论:(权重比较：**内嵌在 html 中的 style 标签中样式** 和 **link 引入的 css 样式**与其[加载顺序有关](https://zhuanlan.zhihu.com/p/41604775) )
- 后加载原则，就近原则

> !important > id > class > tag

- 不要再标签 style 中使用 `style="color:white !important"`,会造成无法修改这一样式

## 关键渲染路径

浏览器解析渲染页面

- 解析 HTML 生成 DOM 树
- 解析 CSS 生成 CSSOM 规则树
- 将 DOM 树与 CSSOM 规则树合并在一起生成渲染树
- 遍历渲染树开始布局，计算每个节点的位置大小信息
- 将渲染树每个节点绘制到屏幕

构建 DOM 树

> 当浏览器接收到服务器响应来的 HTML 文档后，会遍历文档节点，生成 DOM 树。需要注意的是，DOM 树生成过程中可能会被 CSS 和 JS 的加载执行阻塞。

构建 CSSOM 规则书

> 浏览器解析 CSS 文件并生成 CSS 规则树，每个 CSS 文件都被解析成一个 StyleSheet 对象，每个对象都包含 CSS 规则。CSS 规则对象包含对应于 CSS 语法的选择器和声明对象以及其他对象
> 渲染阻塞

> 当浏览器遇到一个 script 标记时，DOM 构建将暂停，直至脚本完成执行，然后继续构建 DOM。每次去执行 Js 脚本都会严重阻塞 DOM 树的构建，如果 js 脚本还操作的 CSSOM,而正好这个 CSSOM 还没有下载和构建，浏览器甚至会延迟脚本执行和构建 DOM，直至完成其 CSSOM 的下载和构建。

所以 script 标签的位置很重要。实际使用时，可以遵循下面两个原则：

1. CSS 优先：引入顺序上，CSS 资源先于 JS 资源。
2. JS 置后：通常我们把 JS 代码放到页面底部，且 JS 应尽量少影响 DOM 构建

构建渲染树

> 通过 DOM 树和 CSS 规则树我们便可以构建渲染树。浏览器会先从 DOM 树的根节点开始遍历每个可见节点。对每个可见节点，找到其适配的 CSS 样式规则并应用。

渲染树构建完成后，每个节点都是可见节点并且都含有其内容和对应的规则的样式。这也是渲染树与 DOM 树最大的区别。渲染树是用于显示，那些不可见的元素当然就不会在这棵树中出现了，除此之外，display 等于 none 的也不会被显示在这棵树里头，但是 visibility 等于 hidden 的元素是会显示在这棵树里头的。

渲染树布局

> 布局阶段会从渲染树的根节点开始遍历，然后确定每个接待你对象在页面上的确切大小与位置，布局阶段的输出是一个盒子模型，他会精确的捕获每个元素在屏幕内的确切位置与大小。

渲染树绘制

> 在绘制阶段，遍历渲染树，调用渲染器的 paint()方法在屏幕上显示其内容。渲染树的绘制工作是由浏览器的 UI 后端组件完成

回流与重绘

> 根据选安然树布局，计算 CSS 样式，即每个节点在页面中的带线啊哦和位置等几何信息。HTML 默认是流式布局的，CSS 和 JS 会打破这种布局，改变 DOM 的外观样式以及大小和位置。这时就会触发回流和重绘

重绘

> 屏幕的一部分重绘，不影响整体布局，比如某个 CSS 的背景色变了，但元素的几何尺寸和位置不变。

常见引起重回的属性

- color
- border-style
- box-shadow
- background
- background-size
- border-radius
- background-position

回流

> 当元素的大小位置改变，需要重新验证并计算渲染树。是渲染树的一部分或全部发生了变化。

常见引起回流的属性和方法

添加或者删除可见的 DOM 元素
元素尺寸改变--边距、填充、边框、宽度和高度
内容变化，比如用户在 input 中输入文字
浏览器窗口尺寸改变
计算 offsetWidth 和 offsetHeight
从上面可以看出：回流必将引起重绘，而重绘不一定会引起回流。

## css3 硬件加速(GPU 加速)

硬件加速会自动规避回流和重绘
css 中又一下几个属性能触发硬件加速

- transform
- opacity
- filter
- will-change

如果有一些元素不需要用到上述属性，但是需要触发硬件加速效果，可以使用一些小技巧来诱导浏览器开启硬件加速。

```css
-webkit-transform: translateZ(0);
-moz-transform: translateZ(0);
-ms-transform: translateZ(0);
-o-transform: translateZ(0);
transform: translateZ(0);
/**或者**/
transform: rotateZ(360deg);
transform: translate3d(0, 0, 0);
```

要注意的问题

- 过多的开启硬件加速可能会耗费较多的内存。
- GPU 渲染会影响字体的抗锯齿效果。这是因为 GPU 和 CPU 具有不同的渲染机制，即使最终硬件加速停止了，文本还是会在动画期间显示得很模糊。
