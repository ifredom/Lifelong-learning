# Widget ,Element, RenderObject

## StatelessWidget

1. StatefulWidget 托管了[State]的当前配置，
2. StatelessWidget 用于始终以给定特定配置和环境状态。

---

- `flutter` 创建一个 `StatelessWidget`
- `StatelessWidget` 调用方法 `createElement()`, 创建一个 `Element`
- `Element` 调用方法 RenderObjectElement ，调用 Skia 渲染引擎，将 Element 渲染到屏幕上

## StatefulWidget

StatefulWidget 用于创建 widget 以及上下文 context

- `flutter` 创建一个 `StatefulWidget`
- `StatefulWidget` 调用方法 `createElement()`, 创建一个 `Element`
- `State<StatefulWidget>` 调用方法 `createElement()`, 创建一个 `Element`
- `Element` 调用方法 RenderObjectElement ，调用 Skia 渲染引擎，将 Element 渲染到屏幕上
- 当调用 setState()方法时，当前 `StatefulElement`被标记为 dirty（脏数据），将会调用 update()通知 flutter，当前 `**StatefulElement**` 需要被重建。
- 当下一帧滚动时， `StatefulElement`会调用 `State`中的 `build` 方法重建 children 并生成一个 widget, 旧的 Widget 被抛弃，

---

> 总结：当调用 setState 时，element 会被更新，widget 会生成一个新的替换旧的 widget，state 对象依然保持不变。类似与热更新

> **StateLifecycle 生命周期**

```java
enum _StateLifecycle {
///  [State] 对象已经被创建(create). [State.initState] 在此时调用.
created,
/// [State.initState] 方法已经调用，[State]对象还未创建. [State.didChangeDependencies] 在此时调用.
initialized,
/// [State] 对象已经被构造(build) 并且 [State.dispose] 还未调用
ready,
/// [State.dispose] 方法已经调用 并且  [State] 对象已经不被构造(build).
defunct,
}
```

## [InheritedWidget](https://www.youtube.com/watch?v=Zbm3hjPjQMk)

位于 widget 树顶层，当在多个 statefulWidget 之间数据传递时，可以[用它](https://api.flutter-io.cn/flutter/widgets/InheritedWidget-class.html)
