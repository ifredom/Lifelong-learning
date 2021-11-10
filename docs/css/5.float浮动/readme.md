# float

BFC 所属子元素，垂直方向，根据其高度排列，而不是 dom 节点顺序

## 清除

```css
.clearfix:after {
  display: block;
  content: "";
  clear: both;
  height: 0;
}
```
