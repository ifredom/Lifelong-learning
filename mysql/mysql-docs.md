# mysql-docs


## 1. 单行处理函数

- lower 转小写
- upper 转大写
- substr(diceName, start, end) 取字串
- trim(dictName)  去除空格
- length(dictName)  取长度
- date_format 日期格式化
- format 日期格式化
- str_to_date 字符串转换成日期
- sum 求和
- round 四舍五入
- rand() 生成随机数
- ifnull 可以将null转换成具体值

```bash

# dict column sum
mysql>select sum(money) from t_student;

mysql> select substr(name,2,length(name)-1) from t_student;

## 补助为null的时候，将其当作某个值看待。 这里当作0
mysql> select name,(age +ifnull(id,0))*2 from t_student;

## 总行数，（不为null的行）
mysql> select count(money) from t_student;
```

## 2. 分组处理函数

分组处理函数只能放在 where 查询之前

- min(dictName)
- max(dictName)
- sum(dictName)
- avg(dictName) 平均值
- count(dictName) 计算某一数据的总行数

```bash
mysql> select max(age),min(money),sum(id),count(*) from t_student;
```

## 3. 分组查询（重要性 ⭐⭐⭐⭐⭐⭐）