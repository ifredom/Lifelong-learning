/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  var left = 0;
  var right = nums.length - 1;

  while (left < right) {
    var mid = (left + right) >> 1;
    if (nums[mid] == target) {
      return nums[mid];
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else if (nums[mid] > target) {
      right = mid - 1;
    }
  }

  return nums[left] >= target ? left : left + 1;
};

var result = searchInsert([1, 3, 5, 6, 9, 13, 18, 23], 7);
console.log("result:", result);
