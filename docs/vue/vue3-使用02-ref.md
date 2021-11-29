# [ref](https://v3.cn.vuejs.org/api/refs-api.html#ref)

> 如果泛型的类型未知，建议将 ref 转换为 Ref<T>：

```js
function useState<State extends string>(initial: State) {
  const state = ref(initial) as Ref<State>
  // state.value -> State extends string
  return state
}
```

## unref

> 如果参数是一个 ref，则返回内部值，否则返回参数本身。这是 val = isRef(val) ? val.value : val 的语法糖函数。

## toRef

> 将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 ref

## toRefs

> toRefs 只会为源对象中包含的 property 生成 ref。如果要为特定的 property 创建 ref，则应当使用 toRef

## isRef

> 检查值是否为一个 ref 对象。

## customRef

## shallowRef

## triggerRef
