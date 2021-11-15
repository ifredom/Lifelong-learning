// 1. 两数之和

// https://zhuanlan.zhihu.com/p/88872395
// https://leetcode-cn.com/problems/two-sum/solution/js-by-leetcode-solution/

// 方法一：暴力循环
// Time complexity: O(n²)
// Space complexity: O(1)
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (target == nums[i] + nums[j]) {
        return [i, j];
      }
    }
  }
};

var nums = [3, 2, 4];
var target = 6;
var pos = twoSum(nums, target);
console.log(pos);

// 方法二：两遍哈希表
// Time complexity: O(2*n)
// Space complexity: O()
var twoSum2 = function (nums, target) {
  var map = new Map();
  for (let i = 0; i < nums.length; i++) {
    map.set(nums[i], i);
  }
  for (let j = 0; j < nums.length; j++) {
    const complement = target - nums[j];
    if (map.has(complement) && map.get(complement) != j) {
      return [j, map.get(complement)];
    }
  }
};
var pos2 = twoSum2(nums, target);
console.log(pos2);

// 方法三：一遍哈希表
// Time complexity: O(n)
// Space complexity: O(n)
var twoSum3 = function (nums, target) {
  var map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
};

var pos3 = twoSum3(nums, target);
console.log(pos3);
