var obj = {
  prop: function () {},
  foo: "bar",
};

// 新的属性会被添加, 已存在的属性可能
// 会被修改或移除
obj.foo = "baz";
obj.lumpy = "woof";
delete obj.prop;

// 作为参数传递的对象与返回的对象都被冻结
// 所以不必保存返回的对象（因为两个对象全等）
var o = Object.freeze(obj);

o === obj; // true
Object.isFrozen(obj); // === true
console.log(obj);
