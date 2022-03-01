/**
 * [[PromiseState]]	pending,fulfilled或之一rejected。控制 promise 如何响应对其 then 方法的传入调用。
[[PromiseResult]]	履行或拒绝承诺的价值（如果有）。只有在[[PromiseState]]is not时才有意义pending。
[[PromiseFulfillReactions]]	当/如果承诺从待处理状态转换到已完成状态时要处理List的记录。PromiseReaction
[[PromiseRejectReactions]]	当/如果承诺从挂起状态转换为拒绝状态时要处理List的记录。PromiseReaction
[[PromiseIsHandled]]	一个布尔值，指示 promise 是否曾经有过履行或拒绝处理程序；用于未处理的拒绝跟踪。
 */
export const NewPledgeSymbol = Object.freeze({
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
  }
}

Pledge();
