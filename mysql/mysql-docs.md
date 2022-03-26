# mysql-docs


1. 单行处理函数

- lower 转小写
- upper 转大写
- substr(diceName, start, end) 取字串
- trim(dictName)  去除空格
- length(dictName)  取长度
- date_format 日期格式化
- format 日期格式化
- str_to_date 字符串转换成日期
- sum 求和
- round 四舍五入
- rand() 生成随机数
- ifnull 可以将null转换成具体值

```bash

# dict column sum
mysql>select sum(money) from firstDemo;

mysql> select substr(name,2,length(name)-1) from t_student;

```