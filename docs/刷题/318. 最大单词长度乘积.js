/**
 * ? 318. 最大单词长度乘积
 * ? 找出最大字符串长度的乘积，并且这2个单词不含有公共字母
 * @param {string[]} words
 * @return {number}
 * 1. 将每一个单词的长度保存
 * 2. 对一队单词进行差集比较
 */

var maxProduct = function (words) {
  var len = 0;
  var lenArray = new Array(words.length).fill(0);

  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      if (!hasSameChar(words[i], words[j])) {
        // len计算多次，取最大的值
        len = Math.max(len, words[i].length * words[j].length);
      }
    }
  }

  return len;
};

function hasSameChar(word1, word2) {
  var result = false;
  for (let i = 0; i < word1.length; i++) {
    if (word2.indexOf(word1.charAt(i)) >= 0) {
      result = true;
      break;
    }
  }
  return result;
}

var words = ["abcw", "baz", "foo", "bar", "xtfn", "abcdef"];

var result = maxProduct(words);

var x = hasSameChar("abcw", "d");
console.log(result);
console.log(x);
