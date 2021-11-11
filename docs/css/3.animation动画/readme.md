# css 动画

- transition(过渡)
- animation

## 动画的原理

**动画**

> 定义：由许多静止的画面（帧），以一定的速度（如每秒 30 张）连续播放时，以肉眼因视觉残像产生错觉，而误以为是活动的画面

**概念**

> 帧：每个静止的画面都叫做帧

> 播放速度：每秒 24 帧（影视）或者 25 帧（动画）或者 30 帧（游戏）

## transition

过渡必须要有起始

transition 的优点在于简单易用，但是它有几个很大的局限。

（1）transition 需要事件触发，所以没法在网页加载时自动发生。

（2）transition 是一次性的，不能重复发生，除非一再触发。

（3）transition 只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。

（4）一条 transition 规则，只能定义一个属性的变化，不能涉及多个属性。

## Animation

> CSS Animation 就是为了解决 transition 这些问题而提出的。

```css
div:hover {
  animation: 1s 1s rainbow linear 3 forwards normal;
}
```

等同于

```css
div:hover {
  animation-name: rainbow;
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-delay: 1s;
  animation-fill-mode: forwards;
  animation-direction: normal;
  animation-iteration-count: 3;
}
```

### animation-direction 属性

> 动画循环播放时，每次都是从结束状态跳回到起始状态，再开始播放。
> animation-direction 属性，可以改变这种行为。目录下有图片

- normal (默认)
- reverse
- alternate
- alternate-reverse
