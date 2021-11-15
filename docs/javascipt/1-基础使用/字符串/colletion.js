// set集合：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set

var mySet1 = new Set(["a", "b", "c", "d"]);
var mySet2 = new Set(["c", "d", "e"]);
var set1 = [...mySet1];

console.log(mySet1);
console.log(set1);
console.log(set1[0]);

for (let key of mySet1.keys()) {
  console.log(key);
}

// 模拟求交集

//  模拟求差集
