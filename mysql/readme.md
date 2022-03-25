# [mysql中文文档](https://www.mysqlzh.com/)

```bash
# login mysql. 可忽略空格
> mysql -u root -p -P 3306

# show all databases
mysql> show databases;

# create database
mysql> create databases firstDemo;

# use one database
mysql> use firstDemo

# create table & inital structor
mysql> create table t_student(id int, name varchar(15), age int, monet double);

# show all tables
mysql> show tables;

# change dict name : monet to money
mysql> alter table t_student change monet money double;

mysql> select * from firstDemo;

# drop dict
mysql> alter table t_student drop id;

# add dict
mysql> alter table t_student add id int not null;

# insert data table
mysql> insert into t_student values('ifreom', 18, 999);

# 自增主键起始值
mysql> alter table t_student auto_increment=1000;
mysql> insert into t_student values('tom', 20, 666);

# exit msq
mysql> exit;
mysql> quit;
```

## classifaction 

【数据查询语言】dql: select（查询）

【数据操作语言】dml: insert, delete, update  （新建，删除，修改）

【结构定义语言】ddl: create, drop, alter （新建，删除，修改）

【事务控制语言】tcl: commit, rollback  (提交，回滚)

【数据权限控制】dcl: grant,revoke  （授权，撤销授权）

## actions



```bash
# 1.0 查询所有字段
mysql>select * from firstDemo;

# 1.1 查询表中某字段数据
mysql>select dictName from firstDemo;

# 1.2 设置别名
mysql>select dictName as aliasName from firstDemo;

# 1.3 设置别名方式二，空格+使用单引号
mysql>select dictName 'aliasName' from firstDemo;

# 1.4 多字段
mysql>select dictName1,dictName2 from firstDemo;

# 1.5 使用表达式( +, -, *, / )
mysql>select dictName1,dictName2 * 12 from firstDemo;
```

```bash
# 2. 查看表结构
mysql> description firstDemo;
mysql> desc firstDemo;

```

### 条件查询
> 重要：执行顺序(与逻辑循序不同): **from –> where –> select –> group by–> having–>order by（排序总是在最后）**

- where：数据库中常用的是where关键字，用于在初始表中筛选查询。它是一个约束声明，用于约束数据，在返回结果集之前起作用。

- group by:对select查询出来的结果集按照某个字段或者表达式进行分组，获得一组组的集合，然后从每组中取出一个指定字段或者表达式的值。

- having：用于对where和group by查询出来的分组经行过滤，查出满足条件的分组结果。它是一个过滤声明，是在查询返回结果集以后对查询结果进行的过滤操作。


* 等于 =
* 大于 >
* 大于等于 >=
* 小于 <
* 小于等于 <=
* 不等于 != 或<>

```bash
# 1.6 条件查询
mysql>select dictName1 from firstDemo where id = 18;

mysql>select dictName1 from firstDemo where id != 18;

mysql>select dictName1 from firstDemo where age > 18;

mysql>select dictName1 from firstDemo where age >= 18;

mysql>select dictName1 from firstDemo where age >=18 and age <= 30;

# 闭区间，包含两侧
mysql>select dictName1 from firstDemo where between 18 and 30;

# dict is null
mysql>select dictName1 from firstDemo where money is null;
# dict is not null
mysql>select dictName1 from firstDemo where money is not null;

# condition or
mysql>select dictName1 from firstDemo where money >10000 and age = 18;

# condition and
mysql>select dictName1 from firstDemo where money >10000 or age = 18;

# condition ()
mysql>select dictName1 from firstDemo where money >10000 and (age = 18 or age = 20);

# condition in 注意：age等与18或者20 ，不是范围
mysql>select dictName1 from firstDemo where age in (18,20);

# condition  not in 注意：age等与18或者20 ，不是范围
mysql>select dictName1 from firstDemo where age not in (18,20);

```

### 模糊查询

- **%** 匹配任意字符
- **_** 匹配任意字符
- **%** 匹配任意字符

```bash
# 3.0 条件查询
## % 找出以T结尾的dictName
mysql>select dictName from firstDemo where dictName like '%T';

## % 找出以T结尾的dictName
mysql>select dictName from firstDemo where dictName like '%T';

## % 找出以k开头的dictName
mysql>select dictName from firstDemo where dictName like 'K%';

## _找出第二个字母为A的dictName
mysql>select dictName from firstDemo where dictName like '_A%';

## _找出第三个字母为S的dictName
mysql>select dictName from firstDemo where dictName like '__S%';

## 找出名字中有下划线的的dictName
mysql>select dictName from firstDemo where dictName like '%_%';

```

### 排序


```bash
# 4.0 排序查询

## 默认升序
mysql> select name,money from t_student order by money;

## 指定降序
mysql> select name,money from t_student order by money desc;

## 指定降序
mysql> select name,money from t_student order by money asc;

## 多条件排序. 先根据money升序，只有money相等时，启动age降序排列
mysql> select name,money,age from t_student order by money asc,age desc;

## 根据第几列排序(不建议开发使用)
mysql> select name,money,age from t_student order by 2;

### 综合测试题目：找出金钱在500到1000范围内的人，并根据金钱降序，年龄升序
mysql> select name,age,money from t_student where money >=500 and money<=1000 order by money desc,age asc;
```