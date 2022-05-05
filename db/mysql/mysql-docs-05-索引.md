# mysql-索引


> 索引是为了提高查询效率而存在的一种机制。Mysql中对unique约束字段，自动添加索引

Mysql查找方式：
- 全表扫描
- 索引查找 （高效）


## 什么情况添加索引？

1. 数据量庞大（根据服务器硬件环境判定）
2. 该字段经常出现 where 后面，也就是需要经常被扫描
3. 该字段很少执行DML语句（update,delete,insert）,修改数据后，需要重新对所以进行性排序



```bash
# 添加索引，方式一
mysql> create index test_index_name on transaction1(name);

# 添加索引，方式二
mysql> alter table transaction1 add index test_index2_name(name);

# 删除索引，方式一
mysql> drop index test_index2_name on transaction1;
# 删除索引，方式二
mysql> alter table transaction1 drop index test_index3_name;

# 查看所有
mysql> show index from transaction1;


# 未添加索引，查找数据
mysql> explain select * from transaction1 where age=6;
# 添加索引后，查找字段 （给字段添加索引）
mysql> alter table transaction1 add index testindex(age);
mysql> explain select * from transaction1 where age=6;
```



## 索引失效

什么情况下，即使添加了索引，也不会使用索引去查找？ 

- 回答： 1. 使用模糊查询时 ： select * from transaction1 where name like '%T';
- 回答： 2. 使用or查询时，左右的字段都添加了索引才会只用索引 ： select * from transaction1 where name ='name' or age =1 ;
- 回答： 3. 使用复合索引 create index test_index_name on transaction1(name,age) .单独查询字段name或者age时不会使用索引
- 回答： 4. 在 where 中添加了索引运算
- 回答： 5. 在 where 中使用了函数

## 索引实现原理

- 1. 通过对表字段排序，缩小查找范围，其数据结构为 TreeSet(自平衡的二叉树)。索引是由B-tree实现


## 索引效率

调剂了索引的字段值越唯一越高效