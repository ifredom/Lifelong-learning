# Mongodb

基本操作

```bash
# 进入mongo控制台
> mongo  
# 显示所有数据库
> show dbs
# 显示所有数据库
> show databases


# 使用某个数据库
> use firstdemo

# 显示该数据库中的所有集合
> show collections

# 查看当前使用的数据库
> db
```

## 增删改查 --  增 insert

```bash
# 向集合student张插入一条学生数据（集合没有则自动创建）
> db.student.insert({"name":"张三",age:18})

# 向集合student张插入多条数据
> db.stus.insert([
{"name":"孙悟空",age:55,sex:1},
{"name":"猪八戒",age:21,sex:1},
{"name":"唐僧",age:20,sex:1}
])


# 与insert方法相同，语义更加明确
> db.stus.insertOne({"name":"张三",age:18,sex:1})
> db.stus.insertMany([
{"name":"孙悟空1",age:55,sex:1},
{"name":"猪八戒1",age:21,sex:1},
{"name":"唐僧1",age:20,sex:1}
])
```

## 增删改查 --  查 find

```bash
# 查询所有
> db.getCollection('stus').find()


# 查询属性age值为21的数据
db.getCollection('stus').find({"age":21})
# 查询属性age值为21的数据，并且 name为猪八戒的值
db.getCollection('stus').find({"age":21,"name":"猪八戒"})
```

## 增删改查 --  删除 remove

逻辑删除：实际项目中通常不会真正删除数据，而是通过添加一个字段，显示为不可见

db.stus.remove(query,{
	justone: false 多个
})
```bash
# 删除一条文档
> db.stus.remove({'name':'猪八戒'})

> db.stus.remove({'name':'猪八戒'}，true)
> db.stus.removeOne({'name':'猪八戒'})

> db.stus.removeMany({'name':'猪八戒'})

# 删除属性。删除age属性
db.getCollection('stus').update({"age":21},{$unset:{'age':777}})

# 删除集合
db.stus.drop()

# 删除当前数据库
db.dropDatabase()
```

## 增删改查 --  修改 update

db.stus.update(query,update,{
	multi: false 多个
})
```bash
# 更新符合条件的第一条文档
> db.stus.update({'name':'猪八戒'},{$set:{'age':999}})
> db.getCollection('stus').update({"age":21},{$set:{'age':777}})
> db.getCollection('stus').updateOne({"sex":1.0},{$set:{"age":888}})

# 更新符合条件的多条文档
> db.getCollection('stus').updateMany({"sex":1.0},{$set:{"age":888}})
> db.getCollection('stus').update({"sex":1.0},{$set:{"age":888}},{multi:true})
```