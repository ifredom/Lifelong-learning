# mysql-索引


## 什么叫做索引？
索引是为了提高查询效率而存在的一种机制。

对一本字段来说，查找某个汉字，有2种查找方式
第一种，一页一页的爱着找，知道查找，这种属于【全字典查找】
第二种，先通过目录（索引）取定位大概位置，然后继续局部查找


## 什么情况添加索引？


1. 数据量庞大（根据服务器硬件环境判定）
2. 该字段经常出现 where 后面，也就是需要经常被扫描
3. 该字段很少执行DML语句（update,delete,insert）,修改数据后，需要重新对所以进行性排序


主要注意的是：Mysql会自动对unique约束的字段，默认添加索引.


## 如何添加索引

> create index [defineIndexName] on 
tableName（tableField）

默认索引类型：NORMAL，默认索引方法：BTREE

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


-- 唯一索引
ALTER TABLE examination_info
ADD UNIQUE INDEX uniq_idx_exam_id(exam_id);
 
-- 全文索引
ALTER TABLE examination_info
ADD FULLTEXT INDEX full_idx_tag(tag);
 
-- 普通索引
ALTER TABLE examination_info
ADD INDEX idx_duration(duration);
```

## 查看一个SQL语句是否使用了索引
```sql
mysql> explain select * from transaction1 where age=6;
```

其中 type: ref表示索引 ，rows表示扫描的条数。

删除索引后，会发现rows扫描条数明显减少

## 索引失效

什么情况下，即使添加了索引，也不会使用索引去查找？ 

1. 使用模糊查询时 ： select * from transaction1 where name like '%T';

2. 使用or查询时，左右的字段都添加了索引才会只用索引 ： select * from transaction1 where name ='name' or age =1 ;

3. 使用复合索引 create index test_index_name on transaction1(name,age).单独查询字段name或者age时不会使用索引

4. 在 where 中添加了索引运算

5. 在 where 中使用了函数

## 索引实现原理

- 1. 通过对表字段排序，缩小查找范围，其数据结构为 TreeSet(自平衡的二叉树)。索引是由B-tree实现


## 索引效率

调剂了索引的字段值越唯一越高效


## 索引存储位置

myISAM存储引擎中存在.MYI文件中



SELECT * FROM type,article where type.id=article.type_id;
SELECT * FROM type inner join article on type.id=article.type_id;



## Navicat中的索引类型

1. Unique 创建唯一索引的字段值不能有相同的数据，否则保存不成功；主键id默认就是唯一索引
2. Normal 创建组合索引
3. Full Text MySQL>6默认使用innodb，要把存储引擎改为MYISAM，才能刚创建全文索引，并且全文索引适合在大量数据、比较长的字符串上创建

第一步：修改表格默认存储引擎为MyISAM
```bash
ALTER table exam ENGINE = MyISAM;
```
第二步：创建全文索引 Full Text

