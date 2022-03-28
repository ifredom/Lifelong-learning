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

## limit 分页

> limit [X,Y] limit 后面可以跟 2 位，第一位 start 起始位置， 第二位长度

```bash
#
mysql> select * from teacher limit 1,3;
# 每页显示10条记录  pageNo,PageSize
mysql> select name from teacher limit 0,10;
mysql> select name from teacher limit 1,10;
mysql> select name from teacher limit 2,10;
# 分页查询语句  String sql =  "select ... limit (pageNo-1) * pageZize, pageSize"
```

## table 创建表

> mysql-data.sql 创建表时，必须带上主键

```bash
CREATE TABLE `tl_student` (
  `user_id` varchar(64),
  `username` varchar(255) COMMENT '姓名',
  `sex` int(1) COMMENT '性别',
  `department` varchar(255) COMMENT '部门',
  PRIMARY KEY (`user_id`)
) ENGINE=`InnoDB` DEFAULT CHARACTER SET utf8mb4 COMMENT='菜单管理';


 INSERT INTO `tl_student` (`user_id`, `username`, `sex`, `department`) VALUES ('12345678', 'admin', 1,"development");
```
