# 视图

视图只是表数据的映射，属于虚拟表，并不真正存贮数据。

- 所有对视图操作，都会改变原表
- as 后必须跟 SQL语句

```bash
create view view_name as select * from student;

insert into view_name(name) values('name1');

delete from view_name;

```

## 视图的作用

作用： 简化SQL，简化开发


## 视图，存储过程，函数的却别