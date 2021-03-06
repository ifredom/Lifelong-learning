# mysql-docs

在 Mysql 中常见得数据类型

- varchar: 可变长度字符串。根据时机数据长度分配动态空间
- char: 定长字符串。
- int: 数字型,最长 11 位。等于 Java 中得 int
- bigint: 数字型。等于 Java 中得 long
- float: 单精度浮点型
- double: 双精度浮点型
- date: 短日期类型
- datetime:长日期类型
- clob: 字符大对象，最多存储 4G 得字符串。比如存一个文章，存储一个说明协议。超过 255 个字符都采用 CLOB
- blob: 二进制大对象，专门存储 图片，声音，视频等流媒体数据。 插入数据时必须用 I/O 流

## 子查询

> 思路：分步骤，然后合并

```bash
# 找出除了最穷的学生其他学生
mysql> select name,money from student where money > (select min(money) from student);
```

from 中的子查询可以将传结果当作一张临时表

```bash
#
mysql> select s.classes,s.avgmoney,t.salary from (select classes,avg(money) as avgmoney from student group by classes) s join teacher t on s.avgmoney > 800;
```

## with 子查询抽取

MySql 8.0之前的版本不支持

```sql
with x as (
select * from student
)
select * from x
```
## limit 分页

> limit [X,Y] 

- limit 后面可以跟 2 位，第一位 start 起始位置， 第二位长度

```bash

mysql> select * from teacher limit 1,3;

# 每页显示10条记录  pageNo,PageSize
mysql> select name from teacher limit 0,10;
mysql> select name from teacher limit 1,10;
mysql> select name from teacher limit 2,10;

# 分页查询语句  String sql =  "select ... limit (pageNo-1) * pageZize, pageSize"
```


## in

in后面并不是范围，二十一个具体的值
```bash
mysql> select name from teacher where money in(1000,2000，3000)
```