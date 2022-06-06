# 聚合操作
- $num 计算总和
- $avg 计算平均值
- $min 获取集合中所有文档对应值得最小值
- $max 	获取集合中所有文档对应值得最大值
- $push 	在结果文档中插入值到一个数组中
- $addToSet 在结果文档中插入值到一个数组中，但不创建副本
- $first 根据资源文档的排序获取第一个文档数据
- $last 	根据资源文档的排序获取最后一个文档数据

```sql
-- 多插入几次
db.getCollection('aggregate').insert([{     
	title: 'MongoDB Overview',      
	description: 'MongoDB is no sql database',   
	by_user: 'w3cschool.cc',   
	url: 'http://www.w3cschool.cc',  
	tags: ['mongodb', 'database', 'NoSQL'],  
	likes: 100  
}, 
{ 
	title: 'NoSQL Overview',    
	description: 'No sql database is very fast',    
	by_user: 'w3cschool.cc',   
	url: 'http://www.w3cschool.cc',   
	tags: ['mongodb', 'database', 'NoSQL'],   
	likes: 10  
},  
{ 
	title: 'Neo4j Overview',  
	description: 'Neo4j is no sql database',   
	by_user: 'Neo4j',   
	url: 'http://www.neo4j.com',  
	tags: ['neo4j', 'database', 'NoSQL'],  
	likes: 750  
}, ])
```

### 计算每个作者所写的文章数

```sql
# 分组名称必须是: _id
db.getCollection('aggregate').aggregate([
    {$group:{ _id: "$by_user",totalShowNumber:{$sum:1}}}
])
```

## 管道
- $project：修改输入文档的结构。可以用来重命名、增加或删除域，也可以用于创建计算结果以及嵌套文档。
- $match：用于过滤数据，只输出符合条件的文档。$match使用MongoDB的标准查询操作。
- $limit：用来限制MongoDB聚合管道返回的文档数。
- $skip：在聚合管道中跳过指定数量的文档，并返回余下的文档。
- $unwind：将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值。
- $group：将集合中的文档分组，可用于统计结果。
- $sort：将输入文档排序后输出。
- $geoNear：输出接近某一地理位置的有序文档。
管道操作符实例

```sql
db.getCollection('aggregate').aggregate([
	{$match:{likes:{$gt:100}}},
	{$group:{_id:null,count:{$sum:1}}}
])

db.getCollection('aggregate').aggregate({ $skip : 5 });
```