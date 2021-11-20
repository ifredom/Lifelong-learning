//  349. 两个数组的交集
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersection = function (nums1, nums2) {
  var max = [],
    min = [];
  if (nums1.length > nums2.length) {
    max = nums1.sort();
    min = nums2.sort();
  } else {
    max = nums2.sort();
    min = nums1.sort();
  }
  var target = new Set(max);
  var section = new Set();
  for (const key of target) {
    if (min.indexOf(key) > -1) {
      section.add(key);
    }
  }
  return [...section];
};
var nums1 = [4, 9, 5],
  nums2 = [9, 4, 9, 8, 4];

var result = intersection(nums1, nums2);
console.log(result);
