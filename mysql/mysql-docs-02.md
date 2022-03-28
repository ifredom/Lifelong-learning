# mysql-docs

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
