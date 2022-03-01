export const PledgeSymbol = Object.freeze({
  state: Symbol("PromiseState"),
  result: Symbol("PromiseResult"),
  fulfillReaction: Symbol("PromiseFulfillReactions"),
  rejectReaction: Symbol("PromiseRejectReactions"),
  isHandled: Symbol("PromiseIsHandled"),
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
    this[PledgeSymbol.isHandled] = false;
    this[PledgeSymbol.fulfillReaction] = [];
    this[PledgeSymbol.rejectReaction] = [];
    console.log("xx");
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
// -------------------step1

function CreateResolveFunction(pledge) {
  const alreadyResolved = { value: false };
  const resolve = (resolution) => {
    if (alreadyResolved.value) {
      return;
    }

    alreadyResolved.value = true;

    // can't resolve to the same pledge
    if (Object.is(resolution, pledge)) {
      const selfResolutionError = new Error("Cannot resolve to self.");
      return rejectPledge(pledge, selfResolutionError);
    }

    // non-objects fulfill immediately
    if (!isObject(resolution)) {
      return fulfillPledge(pledge, resolution);
    }

    let thenAction;

    /*
     * 程序到了这里, 我们知道 `resolution` 是一个对象. 如果这个对象是 thenable,
     * 那么我们需要等待，直到   在解析最初的pledge前，并在 thenable执行完成后。
     * 这里使用 `try-catch` 是因为找到then属性时可能会产生一个错误，
     * 如果 then 属性 拥有一个getter 并且任何错误都必须被捕获以及在pledge的 reject 状态中使用。
     */

    try {
      thenAction = resolution.then;
    } catch (thenError) {
      return rejectPledge(pledge, thenError);
    }

    if (isCallable(thenAction)) {
      return fulfillPledge(pledge, resolution);
    }

    /*
     * If `thenAction` is callable, then we need to wait for the thenable
     * to resolve before we can resolve this pledge.
     */

    // TODO: Let job be NewPromiseResolveThenableJob(promise, resolution, thenAction).
    // TODO: Perform HostEnqueuePromiseJob(job.[[Job]], job.[[Realm]]).
  };
  resolve.alreadyResolved = alreadyResolved;
  resolve.pledge = pledge;

  const reject = (reason) => {
    if (alreadyResolved.value) {
      return;
    }
    alreadyResolved.value = true;
    console.log(true);
    return rejectPledge(pledge, reason);
  };
  reject.alreadyResolved = alreadyResolved;
  reject.pledge = pledge;
  return {
    resolve,
    reject,
  };
}

//---------------step2

function rejectPledge(pledge, reason) {
  if (pledge[PledgeSymbol.state] !== "pending") {
    throw new Error("Pledge is already settled");
  }

  const reactions = pledge[PledgeSymbol.rejectReaction];
  pledge[PledgeSymbol.result] = reason;
  pledge[PledgeSymbol.fulfillReaction] = undefined;
  pledge[PledgeSymbol.rejectReactions] = undefined;
  pledge[PledgeSymbol.state] = "rejected";

  if (pledge[PledgeSymbol.isHandled] === false) {
    // TODO: perform HostPromiseRejectionTracker(promise, "reject").
  }

  // TODO: Return `TriggerPromiseReactions(reactions, reason)`.
}
//---------------step3
function fulfillPledge(pledge, value) {
  if (pledge[PledgeSymbol.state] !== "pending") {
    throw new Error("Pledge is already settled");
  }

  const reactions = pledge[PledgeSymbol.rejectReaction];
  pledge[PledgeSymbol.result] = value;
  pledge[PledgeSymbol.fulfillReaction] = undefined;
  pledge[PledgeSymbol.rejectReactions] = undefined;
  pledge[PledgeSymbol.state] = "fulfilled";

  // TODO: Return `TriggerPromiseReactions(reactions, reason)`.
}

function executorFun(resolve, reject) {}

new Pledge(executorFun);
