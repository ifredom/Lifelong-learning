-- 创建学生表
CREATE TABLE student (
	sid varchar(10),   # 学生id
	sname varchar(10), # 姓名
	sage datetime,     # 年龄
	ssex varchar(10)   # 性别
);

insert into student values('01' , '赵雷' , '1990-01-01' , '男');
insert into student values('02' , '钱电' , '1990-12-21' , '男');
insert into student values('03' , '孙风' , '1990-05-20' , '男');
insert into student values('04' , '李云' , '1990-08-06' , '男');
insert into student values('05' , '周梅' , '1991-12-01' , '女');
insert into student values('06' , '吴兰' , '1992-03-01' , '女');
insert into student values('07' , '郑竹' , '1989-07-01' , '女');
insert into student values('08' , '王菊' , '1990-01-20' , '女');

-- 创建课程表
CREATE TABLE course (
	cid varchar(10),   # 课程id
	cname varchar(10), # 课程名称
	tid varchar(10)    # 老师id
);

insert into course values('01' , '语文' , '02');
insert into course values('02' , '数学' , '01');
insert into course values('03' , '英语' , '03');

-- 创建教师表
CREATE TABLE teacher (
	tid varchar(10),  # 教师id
	tname varchar(10) # 教师名称
);

insert into teacher values('01' , '张三');
insert into teacher values('02' , '李四');
insert into teacher values('03' , '王五');

-- 创建成绩表
CREATE TABLE sc (
	sid varchar(10),       # 学生id
	cid varchar(10),       # 课程id
	score decimal(18, 1)   # 得分
);

insert into sc values('01' , '01' , 80);
insert into sc values('01' , '02' , 90);
insert into sc values('01' , '03' , 99);
insert into sc values('02' , '01' , 70);
insert into sc values('02' , '02' , 60);
insert into sc values('02' , '03' , 80);
insert into sc values('03' , '01' , 80);
insert into sc values('03' , '02' , 80);
insert into sc values('03' , '03' , 80);
insert into sc values('04' , '01' , 50);
insert into sc values('04' , '02' , 30);
insert into sc values('04' , '03' , 20);
insert into sc values('05' , '01' , 76);
insert into sc values('05' , '02' , 87);
insert into sc values('06' , '01' , 31);
insert into sc values('06' , '03' , 34);
insert into sc values('07' , '02' , 89);
insert into sc values('07' , '03' , 98);