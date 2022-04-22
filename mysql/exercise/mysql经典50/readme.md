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

## 题目

1. 查询选修了"01"，"02"的学生的信息及课程分数，要求 "01" 的分数比 "02" 课程高

```sql
select s.*,c1.score,c2.score
from student s, sc c1,sc c2
where s.sid = c1.sid
and c1.sid = c2.sid
and c1.cid = "01"
and c2.cid = "02"
and c1.score > c2.score;
```

2. 查询选修了 "01"，"02" 的学生的信息及课程分数，要求 "01" 比 "02" 课程成绩低

```sql
-- 三表连接查询
select s.*,c1.score,c2.score
from student s
join sc c1 on s.sid = c1.sid and c1.cid = "01"
join sc c2 on s.sid = c2.sid and c2.cid = "02"
where c1.score < c2.score;

```
3. 查询平均成绩大于等于60分的学生的学生编号和学生姓名和平均成绩