# 高级操作


```bash
# 替换
db.getCollection('users').replaceOne({"username":"悟空"},{"username":"唐僧"})

# 统计数量
db.getCollection('users').find({}).count()


# 设置属性值为 数组
db.getCollection('users').update({username:"八戒"},{$set: {superhero:{citys:["北京","guangzhou","chengdu"]}}})

# 向数据元素中添加一个值
db.getCollection('users').update({username:"八戒"},{$push: {"superhero.citys":"洛杉矶"}})
```

## 批量插入数据

```bash

# 插入20000条数据  bad
for ( var i = 1; i < 20000; i++ ){
	db.getCollection('users').insert({"num":i})
}

# 更高效的插入数据  god
db.getCollection('users').remove({})
var arr = [];
for ( var i = 1; i < 20000; i++ ){
	arr.push({num:i})
}
db.getCollection('users').insert(arr)

```

## $gt, $lt, $gte, $lte
```bash

# 查找 num值大于40小于50的数据文档
db.getCollection('users').find({num:{$gt:40,$lt:50}})

# 查找 num值大于19995 或 小于10的数据文档
db.getCollection('users').find({$or:[{num:{$lt:10}},{num:{$gt:19995}}]})

# 查找 num值小于等于10的数据文档
db.getCollection('users').find({num:{$lte:10}})

# 查找 num值d大于等于5的数据文档
db.getCollection('users').find({num:{$gte:5}})
```
## limit() 分页
```bash
# 查找 最多10条数据文档
db.getCollection('users').find({num:{$gt:5}}).limit(10)


# 分页公式
db.getCollection('users').find({}).skip((pageNum-1)*pageSize).limit(pageSize)
# 分页公第一页
db.getCollection('users').find({}).skip(0).limit(10)
```

## sort排序

```bash
# 升序
db.getCollection('users').find({num:{$lt:10}}).sort({num:1})
# 降序
db.getCollection('users').find({num:{$lt:10}}).sort({num:-1})
```

## 投影
用于决定是否将查询出来的某些字段显示
```bash
db.getCollection('users').find({num:{$lt:10}},{_id:0,num:1}).sort({num:-1})
```