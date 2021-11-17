// 242. 有效的字母异位词

// 方法二：
// Time complexity: O(2n+logn)
var isAnagram = function (s, t) {
  var arr = s.split("");
  var arr2 = t.split("");
  var map = new Map();
  var map2 = new Map();

  if (arr.length !== arr2.length) {
    return false;
  }

  for (let i = 0; i < arr.length; i++) {
    if (map.has(arr[i])) {
      map.set(arr[i], map.get(arr[i]) + 1);
    } else {
      map.set(arr[i], 1);
    }
    if (map2.has(arr2[i])) {
      map2.set(arr2[i], map2.get(arr2[i]) + 1);
    } else {
      map2.set(arr2[i], 1);
    }
  }

  for (let j = 0; j < arr.length; j++) {
    if (map.get(arr[j]) !== map2.get(arr[j])) {
      return false;
    }
  }
  return true;
};

var s = "anagram",
  t = "nagaram";

var isAn = isAnagram(s, t);
console.log(isAn);

// 方法二：
// Time complexity: O(nlogn)
// Space complexity: O(logn)
var isAnagram2 = function (s, t) {
  return (
    s.length === t.length && [...s].sort().join("") === [...t].sort().join("")
  );
};
var isAn2 = isAnagram2(s, t);
console.log(isAn2);

// 方法三： 最佳  一遍哈希表
// Time complexity: O(n)
// Space complexity: O(logn)
// s负责加，t负责减
var isAnagram3 = function (s, t) {
  if (s.length !== t.length) {
    return false;
  }
  var strArr = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    strArr[s[i].codePointAt(0) - "a".codePointAt(0)]++;
  }
  for (let j = 0; j < t.length; j++) {
    strArr[t[j].codePointAt(0) - "a".codePointAt(0)]--;
    if (strArr[t[j].codePointAt(0) - "a".codePointAt(0)] < 0) {
      return false;
    }
  }
  return true;
};

var isAn3 = isAnagram3(s, t);
console.log(isAn3);
