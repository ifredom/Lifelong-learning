# mysql-docs



## 子查询

> 思路：分步骤，然后合并


```bash
# 找出除了最穷的学生其他学生
mysql> select name,money from student where money > (select min(money) from student);
```


from中的子查询可以将传结果当作一张临时表

```bash
# 
mysql> select s.classes,s.avgmoney,t.salary from (select classes,avg(money) as avgmoney from student group by classes) s join teacher t on s.avgmoney > 800;
```
