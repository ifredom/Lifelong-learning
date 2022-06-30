# Map


## Map.entrySet()

传参为Map 时，可以使用 entrySet方法对参数过滤过滤，避免多次查询

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