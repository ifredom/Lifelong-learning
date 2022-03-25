/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 *
 * 奇数 中间  偶数取小
 */
var searchInsert = function (nums, target) {
  var left = 0,
    right = nums.length - 1;
  while (left <= right) {
    var mid = ((right - left) >> 1) + left;
    console.log(mid);
    if (target <= nums[mid]) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return right + 1;
};

var result = searchInsert([1, 3, 5, 6], 5);
console.log("result:", result);
