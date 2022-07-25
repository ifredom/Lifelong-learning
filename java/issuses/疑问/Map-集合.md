# Map

## Map.entrySet()

传参为 Map 时，可以使用 entrySet 方法对参数过滤过滤，避免多次查询

```java
/**
 * 查询 运行数据
 */
public PageUtils queryPage(
	Long userId,
	Map<String, Object> params
) {
	Query query = new Query();
	for (Map.Entry<String, Object> stringObjectEntry : params.entrySet()) {
		if (!stringObjectEntry.getKey().equals("t")) {
			Pattern pattern = Pattern.compile("^.*" + stringObjectEntry.getValue() + ".*$", Pattern.CASE_INSENSITIVE);
			query.addCriteria(Criteria.where(stringObjectEntry.getKey()).regex(pattern));
		}
	}
}

```

## 向 Map 中添加或修改参数，优雅方法

```java
@GetMapping("/bs")
public List<User> bs(@RequestParam Map<String, Object> params) {
    params = MapUtils.builder(params)  // 在原有参数基础之上
        .field(User::getAge, 20, 30).op(Between.class) // 添加一个年龄区间条件
        .field(User::getName).op(StartWith.class) // 修改 name 字段的运算符为 StartWith，参数值还是用前端传来的参数
        .build();
    return beanSearcher.searchList(User.class, params);
}
```
