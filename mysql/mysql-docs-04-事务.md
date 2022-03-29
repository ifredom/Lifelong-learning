# 事务 transaction ⭐⭐⭐⭐⭐（理解，掌握）

- 一个事务就是一个完整的业务逻辑：多条 DML 语句同时成功，或者同时失败
- 只有 DML 语句才有事务: insert, delete, update。确保数据的安全操作

例如：有一个业务需求，账户 A 向账户 B 转账 10000。A 账户减少资金 10000，B 账户减少资金 10000。

> 事务如何做到多条语句同时成功或者同时失败的？


## 事务的特性

- 原子性  事务是最小的工作单元
- 一致性  事务内操作同时成功，或同时失败
- 隔离性  事务彼此隔离，互不影响
- 持久性  事务结束时，自动commit将数据保存



事务的隔离级别（类似于git操作）

- 1. read uncommitted 读未提交

事务A可以读取事务B的数据，缺陷：脏读现象 dirty read

- 2. read committed 读已提交

大多数数据库的默认级别，也就是至少是二级隔离 缺陷：不可重复读取数据。
每一次读取的数据可能会不一样，比如第一次读取到了3条数据，第二次读取到了4条数据，能够保证真实数据。

- 3. repeatable read 可重复读

mysql默认事务隔离级别
每一次读取的数据都是事务刚刚开启时的镜像数据。数据可能与最新的数据不一致。

- 4. serializable 序列化

效率最低，事务排队，不能并发


## action 操作

- commit 提交事务  insert 语句自动提交
- rollback 回滚事务 回滚到上一次提交位置

---




```bash
# 启动： 中断自动提交。  配合rollback使用
mysql> start transaction;
```

#### 事务隔离 操作

```bash
mysql> set global transaction isolation level read uncommitted;

mysql> set global transaction isolation level read committed;

commit;
```
### 资料

[B 站视频](https://www.bilibili.com/video/BV1Vy4y1z7EX?p=104&spm_id_from=pageDriver)
