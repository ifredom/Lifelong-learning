# mysql-docs-03

- 非空约束 not null
- 唯一约束 unique
- 主键约束 (not null, unique) 会默认添加, 索引 index
- 外键约束 （unique）

| 约束类型 | 主键        | 外键        | 唯一   | 非空     | 自增           | 默认值  |
| -------- | ----------- | ----------- | ------ | -------- | -------------- | ------- |
| 关键字： | primary key | foreign key | unique | not null | auto_increment | default |

---

## constraint：约束

1. 非空 + 唯一

```sql
CREATE TABLE TA_ENGINE1(
  `id` int NOT NULL UNIQUE,
  `name` varchar(127)
);

-- 添加唯一约束
alter table temp add unique (name, password);
-- 修改唯一约束
alter table temp modify name varchar(25) unique;
-- 删除约束
alter table temp drop index name;
```

2. 自定义一个约束名称, 使用场景：便于以后删除特定约束。创建方法：使用表级约束，def_my_constraint 是自定义的一个约束名， UNIQUE(`name`)是约束条件

```sql
CREATE TABLE TA_ENGINE1(
  `id` int,
  `name` varchar(127),
  CONSTRAINT def_my_constraint UNIQUE(`name`)
);


```

3. 自增主键

```sql
CREATE TABLE TA_ENGINE2(
  `id` int primary key AUTO_INCREMENT,
  `name` varchar(127),
);

CREATE TABLE TA_ENGINE3(
  `id` int AUTO_INCREMENT,
  `name` varchar(127),
  `sex` char(5) default 'man',
  primary key(`id`)
);

-- 删除主键约束
alter table temp drop primary key;
-- 添加主键约束
alter table temp add primary key(id,name);
-- 修改主键约束
alter  table temp modify id int primary key；
```

3. 外键

```sql
CREATE TABLE TA_ENGINE4(
  `id` int primary key AUTO_INCREMENT,
  `name` varchar(127),
  foreign key(`id`) references TA_ENGINE3(`sex`)
);
-- 表级别联合外键
CREATE TABLE TA_ENGINE5(
  `id` int primary key AUTO_INCREMENT,
  `name` varchar(127),
  foreign key(`id`) references TA_ENGINE3(`sex`,`name`)
);

-- 删除外键约束
alter table student drop foreign key student_id;
-- 增加外键约束
alter table student add foreign key(classes_name, classes_number) references classes(name, number);
```

## 存储引擎

不同 Mysql 数据库版本支持不同的引擎

- InnoDB
- MEMORY
- MyISAM

1. InnoDB: 特点，非常安全

```sql
CREATE TABLE TA_ENGINE(
  `id` int,
  `name` varchar(127),
  primary key(`id`)
) ENGINE = InnoDB AUTO_INCREMENT=11 DEFAULT CHARACTER SET utf8mb4;
```

### 资料

[B 站视频](https://www.bilibili.com/video/BV1Vy4y1z7EX?p=100)
