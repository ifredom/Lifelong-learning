# [mysql 中文文档](https://www.mysqlzh.com/)

- 【数据查询语言】dql: `select（查询）`

- 【数据操作语言】dml: `insert, delete, update（新建，删除，修改）`

- 【结构定义语言】ddl: `create, drop, alter （新建，删除，修改）`
  `
- 【事务控制语言】tcl: `commit, rollback（提交，回滚）`

- 【数据权限控制】dcl: `grant,revoke（授权，撤销授权）`

> 重要：执行顺序(与逻辑循序不同): **from –> where –> group by –> having –> select –>order by（排序总是在最后） -> limit x,y**

```bash
# login. 可忽略空格
> mysql -u root -p -P 3306

# 设置密码
mysql>ALTER USER 'root'@'localhost' IDENTIFIED BY '123456';

# login. 可忽略空格
> mysql -uroot -p123456 -P 3306

# 新建用户
mysql> create user guess identified by '000000';

# show all databases
mysql> show databases;

# create database
mysql> create databases firstDemo;

# use one database
mysql> use firstDemo

# 导入数据库
mysql> source D:\Aworkspace\A_project_java\renren-fast\db\mysql.sql;

# create table & inital structor
mysql> create table student(id int, name varchar(15), age int, monet double);

# show all tables
mysql> show tables;

mysql> select * from firstDemo;




# 自增主键起始值
mysql> alter table student auto_increment=1000;
mysql> insert into student values('tom', 20, 666);


# exit msq
mysql> exit;
mysql> quit;
```

```bash
# 插入一条数据
mysql> insert into student values('ifreom', 18, 999);

# 更新某一字段数据
mysql> update student set work='engineer' where name='ifredom';

# 删除一条数据
mysql> delete from student where money>1000000;
```

```bash

# 修改字段名称 : monet to money
mysql> alter table student change monet money double;

# 删除字段
mysql> alter table student drop id;

# 添加一个字段
mysql> alter table student add id int not null;

# 加一个字段 在name列之后
mysql> alter table student add work varchar(255) after name;

# 加一个字段 在第一列
mysql> alter table student add work varchar(255) first;

# 修改 数据表的名称
alter table t_student rename student;


# 删除一张表
alter drop table student_copy;
```

## 查询

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

- where：数据库中常用的是 where 关键字，用于在初始表中筛选查询。它是一个约束声明，用于约束数据，在返回结果集之前起作用。

- group by:对 select 查询出来的结果集按照某个字段或者表达式进行分组，获得一组组的集合，然后从每组中取出一个指定字段或者表达式的值。

- having：用于对 where 和 group by 查询出来的分组经行过滤，查出满足条件的分组结果。它是一个过滤声明，是在查询返回结果集以后对查询结果进行的过滤操作。

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
- **\_** 匹配任意字符
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
mysql> select name,money from student order by money;

## 指定降序
mysql> select name,money from student order by money desc;

## 指定降序
mysql> select name,money from student order by money asc;

## 多条件排序. 先根据money升序，只有money相等时，启动age降序排列
mysql> select name,money,age from student order by money asc,age desc;

## 根据第几列排序(不建议开发使用)
mysql> select name,money,age from student order by 2;

### 综合测试题目：找出金钱在500到1000范围内的人，并根据金钱降序，年龄升序
mysql> select name,age,money from student where money >=500 and money<=1000 order by money desc,age asc;
```
