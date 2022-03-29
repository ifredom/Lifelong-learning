# 事务 ⭐⭐⭐⭐⭐（理解，掌握）

- 一个事务就是一个完整的业务逻辑：多条 DML 语句同时成功，或者同时失败
- 只有 DML 语句才有事务: insert, delete, update。确保数据的安全操作

例如：有一个业务需求，账户 A 向账户 B 转账 10000。A 账户减少资金 10000，B 账户减少资金 10000。

> 事务如何做到多条语句同时成功或者同时失败的？
InnoDB存储引擎：

### 资料

[B 站视频](https://www.bilibili.com/video/BV1Vy4y1z7EX?p=104&spm_id_from=pageDriver)
