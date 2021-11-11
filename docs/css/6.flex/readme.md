# Flex

控制自身为行内或块元素
display:flex;
display:inline-flex;

## 方向（决定子元素排序方向）：

flex-direction: row | row-reverse | column | column-reverse;

- row（默认值）：主轴为水平方向，起点在左端。
- row-reverse：主轴为水平方向，起点在右端。
- column：主轴为垂直方向，起点在上沿。
- column-reverse：主轴为垂直方向，起点在下沿。

```css
flex-direction: row;
```

## 换行

flex-wrap: nowrap | wrap | wrap-reverse;

> 只对有宽度或者高度（由 flex-direciton 决定）得起效果

- nowrap（默认值）：不换行。
- wrap：换行。
- wrap-reverse: 换行，第一行在下方。

```css
flex-wrap: nowrap;
```

## flex-flow (方向和换行合并后得简写)

flex-flow： <<flex-direction>> || <<flex-wrap>>

```css
flex-flow: row wrap;
```

## justify-content (子元素主轴排列方式)

> justify-content: flex-start | flex-end | center | space-between | space-around

- flex-start（默认值）：左对齐
- flex-end：右对齐
- center： 居中
- space-between：两端对齐，项目之间的间隔都相等。
- space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

```css
justify-content: flex-start;
```

## align-items (子元素纵轴排列方式)

- flex-start：交叉轴的起点对齐。
- flex-end：交叉轴的终点对齐。
- center：交叉轴的中点对齐。
- baseline: 项目的第一行文字的基线对齐。
- stretch（默认值）：如果项目未设置高度或设为 auto，将占满整个容器的高度。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

## order(子元素排列先后方式)

```html
<style>
  .flex {
    display: inline-flex;
  }
  .p1 {
    order: 1;
  }
  .p2 {
    order: 3;
  }
  .p3 {
    order: 2;
  }
</style>
<div class="box">
  <p class="p1">文本一文本一文本一文本一文本一</p>
  <p class="p2">文本二文本二文本二文本二文本二</p>
  <p class="p3">文本三文本三文本三文本三文本三</p>
</div>
```

## flex-grow(子元素占据所属空间得放大比例)

> 要求其主轴方向设置可折行

```html
<style>
  .flex {
    display: inline-flex;
    flex-wrap: wrap;
  }
  .p1 {
    flex-grow: 1;
  }

  .p2 {
    flex-grow: 2;
  }

  .p3 {
    flex-grow: 1;
  }
</style>
<div class="box">
  <p class="p1">文本一文本一文本一文本一文本一</p>
  <p class="p2">文本二文本二文本二文本二文本二</p>
  <p class="p3">文本三文本三文本三文本三文本三</p>
</div>
```

## flex-shrink(子元素占据所属空间得缩小比例)

> 当空间不足时，根据其 flex-shrink 数值进行缩小

```html
<style>
  .flex {
    display: inline-flex;
    flex-wrap: nowrap;
  }
  .p1 {
    flex-shrink: 1;
  }

  .p2 {
    flex-shrink: 2;
  }

  .p3 {
    flex-shrink: 1;
  }
</style>
<div class="box">
  <p class="p1">文本一文本一文本一文本一文本一</p>
  <p class="p2">文本二文本二文本二文本二文本二</p>
  <p class="p3">文本三文本三文本三文本三文本三</p>
</div>
```

## flex-basis(子元素占据所属空间得缩小比例)

> flex-basis 属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为 auto，即项目的本来大小。

## align-self(允许单个子元素有与其他元素不一样的对齐方式)

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
