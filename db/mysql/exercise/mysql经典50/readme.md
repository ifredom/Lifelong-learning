# Mysql 经典 50 题

- 1、学生表

```sql
CREATE TABLE student (
	sid varchar(10),   # 学生id
	sname varchar(10), # 姓名
	sage datetime,     # 年龄
	ssex varchar(10)   # 性别
);
```

- 2、课程表

```sql
CREATE TABLE course (
	cid varchar(10),   # 课程id
	cname varchar(10), # 课程名称
	tid varchar(10)    # 老师id
);
```

- 3、教师表

```sql
CREATE TABLE teacher (
	tid varchar(10),  # 教师id
	tname varchar(10) # 教师名称
);
```

- 4、成绩表

```sql
CREATE TABLE sc (
	sid varchar(10),       # 学生id
	cid varchar(10),       # 课程id
	score decimal(18, 1)   # 得分
);
```
