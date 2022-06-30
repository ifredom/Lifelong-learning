# mysql-docs

[练习题册](https://www.nowcoder.com/practice/ddbcedcd9600403296038ee44a172f2d?tpId=199&tqId=1971219&ru=%2Fpractice%2Ff9f82607cac44099a77154a80266234a&qru=%2Fta%2Fsql-quick-study%2Fquestion-ranking&sourceUrl=%2Fexam%2Foj%3Ftab%3DSQL%25E7%25AF%2587%26topicId%3D199%26fromPut%3Dpc_newmedia_zhihu_kol_rocky)

## 1. 单行处理函数

- lower 转小写
- upper 转大写
- substr(diceName, start, end) 取字串
- stubstring_index(diceName, start, end) 取字串
- trim(dictName) 去除空格
- length(dictName) 取长度
- date_format 日期格式化
- format 日期格式化
- str_to_date 字符串转换成日期
- sum 求和
- round 四舍五入
- rand() 生成随机数
- ifnull 可以将 null 转换成具体值
- replace(expression,targetStr,valueStr) 替换


```bash

# dict column sum
mysql>select sum(money) from student;

mysql> select substr(name,2,length(name)-1) from student;

## 补助为null的时候，将其当作某个值看待。 这里当作0
mysql> select name,(age +ifnull(id,0))*2 from student;

## 总行数，（不为null的行）
mysql> select count(money) from student;

## format() 字符传格式化
mysql> select format(salary,'￥99,999,999') from teacher;
```


## 2. 分组处理函数

**分组处理函数只能放在 where 查询之前，在group by分组完成后执行**


- min(dictName)
- max(dictName)
- sum(dictName)
- avg(dictName) 平均值
- count(dictName) 计算某一数据的总行数

```bash
mysql> select max(age),min(money),sum(id),count(*) from student;
```

example: 找出每个部门的最高薪资,是每个部门

## 3. 分组查询（重要性 ⭐⭐⭐⭐⭐⭐）

> 先分组之后，才执行 select 查询。先 group by 分组再执行 where 查询，
>
> 要求：

- **分组的数据长度是相等的**，也就是需要注意数据 null 的情况。
- **slect 语句只能跟参加分组的字段，以及分组函数**，其他的一律不行（group by 后跟着什么字段，slect 后就只能跟什么字段）

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


### distinct （ 去重关键字）

distinct放在所有字段最前面，表示后面跟着的字段进行联合查询然后去重

```bash
mysql>  select distinct department,money from student;
```

## date_format() 日期格式化

> date 是短日期，只包含年月日。 datetime,包含年月日时分秒

- str_to_date( String 日期, 格式) 如果字符串刚好是 **%Y-%m-%d** 年月日这种格式，那么可以不用 str_to_date 函数

---

- %Y 年
- %m 月
- %d 日
- %h 时
- %m 分
- %s 秒

```bash
mysql> update teacher set birth = str_to_date('01-10-1990','%d-%m-%Y');

## 用户返回需要设置的日期格式
mysql> select date_format(birth,'%Y月%m年%d日') as birthday from teacher;

## 设置 datetime 长日期
mysql> update teacher set create_time='1991-05-01 17:28:59';
```
## [from_unixtime 日期格式转化](https://www.nowcoder.com/knowledge/intro-index?kcid=20)
```bash
select
from_unixtime(birth) as time
From question_practice_detail

# 将日期中的年、月、日分别提取出来
select
year('2021-08-01'),
month('2021-08-01'),
day('2021-08-01')
From question_practice_detail

# 计算日期差
select
DATEDIFF('2017-10-15 00:00:00','2017-09-15 00:00:00') as d
from question_practice_detail
```

## count(field) 和 count(*)区别。
- count(*)是统计总记录条数
- count(field)是统计字段不为null的数据

## union

将结果集相加 .sql注入通过此实现

```SQL
SELECT tname,salary from teacher
union
SELECT tname,salary from teacher
```

## using

于join ... on中的on等同

```SQL
SELECT tname,salary from teacher a join grade b on a.tid = b.tid
# 等同于
SELECT tname,salary from teacher a join grade b useing(tid)
```