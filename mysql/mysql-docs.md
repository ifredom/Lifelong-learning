# mysql-docs


## 1. 单行处理函数

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
mysql>select sum(money) from student;

mysql> select substr(name,2,length(name)-1) from student;

## 补助为null的时候，将其当作某个值看待。 这里当作0
mysql> select name,(age +ifnull(id,0))*2 from student;

## 总行数，（不为null的行）
mysql> select count(money) from student;
```

## 2. 分组处理函数

**分组处理函数只能放在 where 查询之前**

- min(dictName)
- max(dictName)
- sum(dictName)
- avg(dictName) 平均值
- count(dictName) 计算某一数据的总行数

```bash
mysql> select max(age),min(money),sum(id),count(*) from student;
```

## 3. 分组查询（重要性 ⭐⭐⭐⭐⭐⭐）

> 先分组之后，才执行select查询。先group by分组再执行where查询，
>
> 要求： 

- **分组的数据长度是相等的**，也就是需要注意数据null的情况。
- **slect语句只能跟参加分组的字段，以及分组函数**，其他的一律不行（group by后跟着什么字段，slect后就只能跟什么字段）

```bash
# 1. 单条件分组。 根据工作类型，计算各个岗位的总金额。  必须work数据的条数 和money数据的条数相等
mysql> select work,sum(money) from student group by work;

# 2. 单条件分组。 根据工作类型，找个各个工作的最大金额。 
mysql> select work,max(money) from student group by work;

# 3. 多条件分组。 找出不同部门，不同工种中，工资最高的人。
mysql> select department,work,max(money) from student group by department,work;

# 4.1 单条件分组。 找出每个部门，最高工资最高大于1000的。
mysql> select department,max(money) from student where money>1000 group by department;
# 4.2 与4.1同等效果。 但是效率上优先使用where
mysql> select department,max(money) from student group by department having max(money)>1000;

# 5 单条件分组。 找出每个部门平均薪资，要求找出平均薪资高于2500的
mysql> select department,avg(money) from student group by department having avg(money)>2500;


# 6. 找出每个部门平均薪资，要求找出平均薪资高于1000的，boss除外,按照平均薪资降序排列
mysql>  select department,avg(money) from student where work <> 'boss' group by department having avg(money)>1000 order by department asc;
```

- 使用 `having` 可以对分组之后的数据进一步筛选，
- 优化策略：优先使用`where` ,其次选择`having`



> distinct 关键字  去重

```bash
mysql>  select distinct department,money from student;
```

## 4. 连接查询（重要性 ⭐⭐⭐⭐⭐⭐）


sql99优点：表连接的条件是独立的，连接之后，如果还需要进一步筛选，再往后继续添加where

- 表的连接次数越多，速度越慢


- 内连接. inner 可以省略。完全匹配查询条件的数据都查询出来
- 自连接. 一张表看成两张表，关键是： **取别名**
- 外连接。 将 left/right 关键字 左/右侧 的表作为主表。**将主表的数据都查询出来**。

```bash
# 内连接之等值连接 99语法 。inner 可以省略
mysql> select s.classes from student s inner join teacher t on s.classes = t.classes;


# 内连接。 找出老师所属班级的学生，并显示学生名，班级，老师名称
mysql> select s.name,s.classes,t.name as teacher from teacher t join student s on t.classes = s.classes;

# 外连接。 将right关键字右侧的表作为主表。将主表的数据都查询出来。
mysql> select s.name,s.classes,t.name as teacher from student s right join teacher t on s.classes = t.classes;

``` 