# [redis6](https://redis.io/docs/getting-started/)

Redis，英文全称是Remote Dictionary Server（远程字典服务），是一个使用ANSI C编写，支持网络、基于内存，可持久化的日志型、Key-Value数据库，并提供多种语言的API

## redis大纲

1. NoSQL历史
2. Redis概述与安装
3. Redis支持的五大基本数据类型
4. Resid6配置文件
5. Redis6的发布与订阅
6. Redis6的新支持的数据类型
7. Redis6操作：使用Jedis操作Redis数据库
8. Spring Boot 中整合 Redis
9. Redis事务操作
10. Redis6主从
11. Redis6集群
12. Redis6持久化RDB
13. Redis6持久化AOF
14. Redis6解决了哪些问题
15. Redis6新功能

## 1.NoSQL历史

NoSQL(Not Only SQL)数据库，又叫做缓存数据库，是为了弥补关系型数据库性能不足而而诞生。目的是为了：`提高数据库IO性能`

- 1）Memcache: 最早的出现的NoSQL数据库，缺点只支持存储string类型数据，并且无法持久化。
- 2）redis: 为了适应大数据时代，redis应运而生，支持多种数据类型存储，并且可以持久化（存储在硬盘上）、
- 3）MongoDB: 文档型NoSQL,支持存储更多的类型类型，是用于存储库存数据
- 4）HBase: 为了存储随机性，实时读写操作的场景数据。
- 5）Apache Cassandra：为了存储海量数据而诞生，支持存储TB单位数据。
- 6）图关系型数据库Neo4j：为了存储任务关系型数据库（比如对人物关系进行存储，常见于APP中朋友圈，喜好关系）

---

1. Nosql的优势

（1）使用nosql解决cpu与内存压力

（2）使用nosql解决I/O压力

2. 使用场景

（1）数据的高并发读写

（2）海量数据读写

（3）数据可扩展性

3. 不适用场景 
（1）需要事务的支持

（2）基于sql的结构化查询存储，需要即席查询

> Tips: Db Engines: [数据库排行榜](https://hellogithub.com/report/db-engines/?url=/periodical/category/%E5%85%B6%E5%AE%83/)


## 2.[Redis概述与安装](https://blog.csdn.net/win7583362/article/details/124448466)

 Redis概述

（1）开源的key-value系统

（2）支持String、List、Set、zset、hash等数据类型

（3）数据库支持push/pop/add/remove操作

（3）支持不同方式的排序

（4）可写入内存也可以持久化

（5）主从同步功能

## 3.Redis支持的五大基本数据类型

- string
	- set key value,get key value
	- 应用场景：共享session、分布式锁，计数器、限流
- hash
	- hset key value,hget key value
	- 应用场景：缓存用户信息
- list
	- lpush key val1 val2 val3 左插入
	- rpush key val1 val2 val3 右插入
	- lset key index newValue   在指定下标处设置新值
	- linsert key before/after privot value 在键值key中得值为privot得某一项值前/后插入数据value
	- lindex key index 获取指定键值，下标为index得值
	- lrange key startIndex endIndex 获取指定下标范围得键值得数据（lrange k1 0,-1）,-1表示结尾
	- 应用场景：有限集合，消息队列
- set 
	- sadd key value,smembers key
	- 应用场景：用户标签，随机数抽奖，社交需求
- zset
	- 有序列表

## 4. [Resid6配置文件](https://blog.csdn.net/win7583362/article/details/124448466)
## [缓存穿透](https://juejin.cn/post/7002011542145204261)

>> 通俗点说，读请求访问时，缓存和数据库都没有某个值，这样就会导致每次对这个值的查询请求都会穿透到数据库，这就是缓存穿透。

流程：
- 读请求-查询redis数据库
	- Y - 返回redis中查询到得数据
	- N - 继续查询磁盘数据库-如果有，更新缓存-返回数据.
	如果无，返回空数据。
如何避免缓存穿透呢？ 一般有三种方法。

1.如果是非法请求，我们在API入口，对参数进行校验，过滤非法值。
2.如果查询数据库为空，我们可以给缓存设置个空值，或者默认值。但是如有有写请求进来的话，需要更新缓存哈，以保证缓存一致性，同时，最后给缓存设置适当的过期时间。（业务上比较常用，简单有效）
3.使用布隆过滤器快速判断数据是否存在。即一个查询请求过来时，先通过布隆过滤器判断值是否存在，存在才继续往下查。

## 缓存雪崩

缓存雪崩： 指缓存中数据大批量到过期时间，而查询数据量巨大，请求都直接访问数据库，引起数据库压力过大甚至down机。
缓存雪奔一般是由于大量数据同时过期造成的，对于这个原因，可通过均匀设置过期时间解决，即让过期时间相对离散一点。如采用一个较大固定值+一个较小的随机值，5小时+0到1800秒酱紫。
Redis 故障宕机也可能引起缓存雪奔。这就需要构造Redis高可用集群啦。


## 缓存击穿问题

缓存击穿： 指热点key在某个时间点过期的时候，而恰好在这个时间点对这个Key有大量的并发请求过来，从而大量的请求打到db。
缓存击穿看着有点像，其实它两区别是，缓存雪奔是指数据库压力过大甚至down机，缓存击穿只是大量并发请求到了DB数据库层面。可以认为击穿是缓存雪奔的一个子集吧。有些文章认为它俩区别，是区别在于击穿针对某一热点key缓存，雪奔则是很多key。
解决方案就有两种：

1.使用互斥锁方案。缓存失效时，不是立即去加载db数据，而是先使用某些带成功返回的原子操作命令，如(Redis的setnx）去操作，成功的时候，再去加载db数据库数据和设置缓存。否则就去重试获取缓存。
2. “永不过期”，是指没有设置过期时间，但是热点数据快要过期时，异步线程去更新和设置过期时间。


## Redis 的持久化机制
- RDB 
- AOF


### 相关软件介绍：

- redis-benchmar：性能测试工具

- redis-check-aof：修改有问题的AOF

- redis-check-rdb：修改有问题的rdb文件

- redis-sentinel：Redis的集群使用

- redis-server：Redis服务器集群使用

- redis-cli：客户端，操作入口

#### 参考阅读


- [Redis速解](https://www.cnblogs.com/mrwhite2020/p/14727548.html)