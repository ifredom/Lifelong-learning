# 视图

- 所有对视图操作，都会改变原表
- as 后必须跟 SQL语句

```bash
create view view_name as select * from student;

insert into view_name(name) values('name1');

delete from view_name;

```


作用： 简化开发