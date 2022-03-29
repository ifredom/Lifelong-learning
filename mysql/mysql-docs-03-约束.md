# mysql-docs-03

- 非空约束 not null
- 唯一约束 unique
- 主键约束 (not null, unique) 会默认添加, 索引 index
- 外键约束 （unique）

---

## constraint：约束

1. 非空 + 唯一

```sql
CREATE TABLE TA_ENGINE1(
  `id` int NOT NULL UNIQUE,
  `name` varchar(127)
);
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
  primary key(`id`)
);
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
