# tinyint

数据库中字段类型为tinyint，并且长度为1， 在generator 生成时，该字段会编程boolean类型，最新版本mybatis generator暂无办法，

最终解决办法：手动修改entity中该字段的类型为 Integer，并且SQL语句只能手写，不能使用通过mybatis提供的方法


## tinyint [为什么能转换成boolean类型](https://blog.csdn.net/u013066244/article/details/121685595)