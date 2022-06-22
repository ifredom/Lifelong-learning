
# 连接查询（重要性 ⭐⭐⭐⭐⭐⭐）

语法：select [field] from [tableOneName] [{left/right}] join [tableSecondNmae] on [equal condition] where [condition]


- 表连接的条件是独立的，连接之后，如果还需要进一步筛选条件，再往后继续添加 where。
- 表的连接次数越多，速度越慢，尽量减少连接表连接次数

---

- 内连接. inner 可以省略。完全匹配查询条件的数据都查询出来
- 自连接. 一张表看成两张表，关键是： **取别名**
- 外连接。 将 left/right 关键字 左/右侧 的表作为主表。**将主表的数据都查询出来**。


## 内连接 - 等值连接

完全匹配的部分可以查询出来
inner 可以省略

```bash
mysql> select s.classes from student s inner join teacher t on s.classes = t.classes;

# 内连接。 找出老师所属班级的学生，并显示学生名，班级，老师名称
mysql> select s.name,s.classes,t.name as teacher from teacher t join student s on t.classes = s.classes;
```
## 内连接 - 非等值连接

使用 between *** and

```bash
select s.name,s.classes from student s join teacher t on s.money between t.max_money and t.middle_money
```

## 内连接 - 自连接

将自己看作一行表

```bash
select a.userName,b,userName from t_student a join  t_student b where a.mgrNo =b.empno
```

## 外连接

```bash
# 将right关键字右侧的表作为主表。将主表的数据都查询出来。
mysql> select s.name,s.classes,t.name as teacher from student s right join teacher t on s.classes = t.classes;

```

### 内连接与外连接的区别？

- 外连接中，表存在主次关系。内连接中，表之间没有主次关系。