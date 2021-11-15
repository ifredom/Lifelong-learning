// 1. 两数之和
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (target == nums[i] + nums[j]) {
        return [i, j];
      }
    }
  }
};

var nums = [2, 5, 5, 11];
var target = 10;
var pos = twoSum(nums, target);
console.log(pos);

// https://zhuanlan.zhihu.com/p/88872395
// https://leetcode-cn.com/problems/two-sum/solution/js-by-leetcode-solution/