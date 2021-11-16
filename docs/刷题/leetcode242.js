// 242. 有效的字母异位词
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

var isAnagram2 = function (s, t) {
  return (
    s.length === t.length && [...s].sort().join("") === [...t].sort().join("")
  );
};
var isAn2 = isAnagram2(s, t);
console.log(isAn2);
