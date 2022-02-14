# Promise

> 如何自己实现一遍 promise，了解状态机的底层原理？ ECMA262 标准已将具体步骤，以及相应的函数名都给确定了，一步步按照其要求来即可.

[ECMA 262 标准](https://www.ecma-international.org/wp-content/uploads/ECMA-262_12th_edition_june_2021.pdf#page=766&zoom=100,45,461)

- 1. 如果缺少执行函数 `executor`，那么抛出一个 `TypeError` 异常

- 2. 如果 `IsCallable(executor)` 是 false, 那么抛出一个 `TypeError` 异常.用户判断传入的必须是一个可执行函数。

- 3. [[PromiseState]] 默认值为 `pending`, 可选值为：`pending, fulfilled, rejected`。作用：当调用 promise 上的 then 方法时，调用传入函数。

- 4. [[PromiseResult]] 默认值为 `undefined`。只有当[[PromiseState]]的状态值不为 pending 时才有意义，用于标识是否履行或者拒绝了。

- 5. [[PromiseFulfillReactions]] 当 Promise 从待处理状态转换到已完成状态时，需要处理的 List 的记录 - PromiseReaction

- 6. [[PromiseRejectReactions]] 当 Promise 从挂起状态转换为拒绝状态时，需要处理的 List 的记录 - PromiseReaction

- 7. [[PromiseIsHandled]] 返回结果为布尔值，用于标识 Promise 是否曾经有过履行或拒绝处理程序；用于跟踪未处理的拒绝 PromiseReaction 。

- 8. 让 `CreateResolvingFunctions(promise)` 作为解析方法。

- 9. 让 状态变化后，调用 执行函数 executor 传入的 PromiseReaction 或者 PromiseReaction。`executor(resolve, reject)`

- 10. 如果 状态变化后是 rejected，那么 要对未处理的 PromiseReaction 进行处理 `reject(error)`

- 返回 Promise

## 第一步：Promise constructor 如何工作的?

```js
export const PledgeSymbol = Object.freeze({
  state: Symbol("PromiseState"),
  result: Symbol("PromiseResult"),
  fulfillReaction: Symbol("PromiseFulfillReactions"),
  rejectReaction: Symbol("PromiseRejectReactions"),
  handle: Symbol("PromiseIsHandled"),
});

export class Pledge {
  constructor(executor) {
    if (executor === "undefined") {
      throw new TypeError("Executor missing.");
    }

    if (!isCallable(executor)) {
      throw new TypeError("Executor missing.");
    }
    this[PledgeSymbol.state] = "pending";
    this[PledgeSymbol.result] = undefined;
    this[PledgeSymbol.handle] = false;
    this[PledgeSymbol.fulfillReaction] = [];
    this[PledgeSymbol.rejectReaction] = [];

    const { resolve, reject } = CreateResolveFunction(this);

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
}

export function isCallable(argument) {
  return typeof argument === "function";
}
new Pledge();
```

## 第二步：创建一个解析方法 CreateResolvingFunctions

```js
function CreateResolveFunction(pledge) {
  // 当状态变化为 fulfilled时，记录被添加到执行栈中
  const alreadyResolved = { value: false };

  const resolve = (solution) => {};
  resolve.alreadyResolved = alreadyResolved;
  resolve.pledge = pledge;

  const reject = (reason) => {};
  reject.alreadyResolved = alreadyResolved;
  reject.pledge = pledge;
  return {
    resolve,
    reject,
  };
}
```

- 这个函数第一个奇怪的地方在于 alreadyResolved 为什么不直接使用 bool,而使用对象。因为规范申明，它是一个记录,而不是一种状态，所以不使用布尔值。同时这样做可以保证 resolve 无论在哪里都可以读取和修改相同的值。（当这个值在 resolve 和 reject 的属性中被写或者读时，使用布尔值的话此时不允许共享）

- 规范指出 resolve 和 reject 函数应该包含原始的 promise(pledge)属性，这是为了让函数在执行时，可以访问到这些值。但是在 Javascript 中其实是不需要这两句的，因为 resolve 和 reject 函数 都是闭包，随时可以访问到这些相同的值，留着此代码是为了规范的的完整性。

## 第三步：创建一个 reject

因为 reject 比 resolve 简单，所以从它开始。

- 1. Assert: The value of promise.[[PromiseState]] is pending.
- 2. Let reactions be promise.[[PromiseRejectReactions]].
- 3. Set promise.[[PromiseResult]] to reason.
- 4. Set promise.[[PromiseFulfillReactions]] to undefined.
- 5. Set promise.[[PromiseRejectReactions]] to undefined.
- 6. Set promise.[[PromiseState]] to rejected.
- 7. If promise.[[PromiseIsHandled]] is false, perform HostPromiseRejectionTracker(promise, "reject").
- 8. Return TriggerPromiseReactions(reactions, reason).

## 第四步：创建一个 resolve

- 1. If the resolution value is the promise itself, then throw an error.

- 2. If the resolution value is a non-object, then fulfill the promise with the resolution value.

- 3. If the resolution value is an object with a then property:

     3.1. If the then property is not a method, then fulfill the promise with the resolution value.

     3.2. If the then property is a method (that makes the object a thenable), then call then with both a fulfillment and a rejection handler that will resolve or reject the promise.

### 参考资料

https://humanwhocodes.com/blog/2020/09/creating-javascript-promise-from-scratch-constructor/
