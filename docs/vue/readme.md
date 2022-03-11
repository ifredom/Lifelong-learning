# Vue

## Proxy 和 defineProperty 区别

1. Proxy 使用上比 Object.defineProperty 方便的多。
2. Proxy 代理整个对象，Object.defineProperty 只代理对象上的某个属性。
3. 如果对象内部要全部递归代理，则 Proxy 可以只在调用时递归，而 Object.defineProperty 需要在一开始就全部递归，Proxy 性能优于 Object.defineProperty。
4. vue 中，Proxy 在调用时递归，Object.defineProperty 在一开始就全部递归，Proxy 性能优于 Object.defineProperty。
5. 对象上定义新属性时，Proxy 可以监听到，Object.defineProperty 监听不到。
6. 数组新增删除修改时，Proxy 可以监听到，Object.defineProperty 监听不到。
7. Proxy 不兼容 IE，Object.defineProperty 不兼容 IE8 及以下。

### 面试 Vue 知识点

[Vue 知识点](https://juejin.cn/post/6984210440276410399#heading-4)
