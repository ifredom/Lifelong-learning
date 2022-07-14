# Java工具类

1. String 工具类

使用： StringUtils.isNotBlank("ifredom");
```yml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
    <version>3.12.0</version>
</dependency>
```

2. Collection 集合工具类（2种）

- 1.`java.util`包下的 `Collections` 类

```bash
List<Integer> list = new ArrayList<>();
list.add(2);
list.add(1);
list.add(3);

Collections.sort(list);// 升序
Collections.reverse(list);// 降序

Integer max = Collections.max(list);// 获取最大值
Integer min = Collections.min(list);// 获取最小值

List<Integer> integers = Collections.synchronizedList(list);// 将ArrayList转换成线程安全集合

Collections.emptyList();// 空集合

int i = Collections.binarySearch(list, 3);// 二分查找

List<Integer> unmodifiablIntegers = Collections.unmodifiableList(list); // 转换成不可修改集合
```

---

- 2.`org.apache.commons` 包下的 `ColletcionUtils`（不推介使用spring框架提供的collections）
- 
```yml
<dependency>
    <groupId>org.apache.directory.studio</groupId>
    <artifactId>org.apache.commons.collections</artifactId>
    <version>3.2.1</version>
</dependency>
```

使用：

```bash
List<Integer> list = new ArrayList<>();
list.add(2);
list.add(1);
list.add(3);

List<Integer> list2 = new ArrayList<>();
list2.add(2);
list2.add(4);

if (CollectionUtils.isEmpty(list)) {
    System.out.println("集合为空");
}

if (CollectionUtils.isNotEmpty(list)) {
    System.out.println("集合不为空");
}

//获取并集
Collection<Integer> unionList = CollectionUtils.union(list, list2);
System.out.println(unionList);

//获取交集
Collection<Integer> intersectionList = CollectionUtils.intersection(list, list2);
System.out.println(intersectionList);

//获取交集的补集
Collection<Integer> disjunctionList = CollectionUtils.disjunction(list, list2);
System.out.println(disjunctionList);

//获取差集
Collection<Integer> subtractList = CollectionUtils.subtract(list, list2);
System.out.println(subtractList);
```


3. Objects 工具类

```java
Integer integer = new Integer(1);

if (Objects.isNull(integer)) {
    System.out.println("对象为空");
}

if (Objects.nonNull(integer)) {
    System.out.println("对象不为空");
}
```

4. Boolean 工具类

与字符工具类一样，推介使用： **commons-lang3**

布尔的包装类：`Boolean`，	它有三种值：`null、true、false`

```yml
<dependency>
    <groupId>org.apache.commons</groupId>
    <artifactId>commons-lang3</artifactId>
    <version>3.12.0</version>
</dependency>
```

```java
Boolean aBoolean = new Boolean(true);
Boolean aBoolean1 = null;

// 判断true或false
System.out.println(BooleanUtils.isTrue(aBoolean));
System.out.println(BooleanUtils.isFalse(aBoolean));

// 判断不为true或不为false
System.out.println(BooleanUtils.isNotTrue(aBoolean));
System.out.println(BooleanUtils.isNotTrue(aBoolean1));

// 转换成数字
System.out.println(BooleanUtils.toInteger(aBoolean));
System.out.println(BooleanUtils.toInteger(aBoolean1));

// Boolean转换成布尔值
System.out.println(BooleanUtils.toBoolean(aBoolean));
System.out.println(BooleanUtils.toBoolean(aBoolean1));
System.out.println(BooleanUtils.toBooleanDefaultIfNull(aBoolean1, false));
```

5. IO 工具类


```yml
<!-- IO操作工具类 -->
<dependency>
    <groupId>org.apache.directory.studio</groupId>
    <artifactId>org.apache.commons.io</artifactId>
    <version>2.4</version>
</dependency>
```

主要常用到这3个类

- `org.apache.commons.io.IOUtils`
- `org.apache.commons.io.FilenameUtils`
- `org.apache.commons.io.FileUtils`

```java
public void upload(File file) {


	// 读取文件
	String str = IOUtils.toString(new FileInputStream("/temp/a.txt"), StandardCharsets.UTF_8);
	System.out.println(str);

	// 写入文件
	String str = "abcde";
	IOUtils.write(str, new FileOutputStream("/temp/b.tx"), StandardCharsets.UTF_8);

	// 文件拷贝
	IOUtils.copy(new FileInputStream("/temp/a.txt"), new FileOutputStream("/temp/b.txt"));

	// 读取文件内容到字节数组
	byte[] bytes = IOUtils.toByteArray(new FileInputStream("/temp/a.txt"));



	String originalFilename = file.getOriginalFilename();

	// 获取文件后缀
	String suffix = FilenameUtils.getExtension(originalFilename)
	// 获取返回文件名，不包含后缀
	String filename = FilenameUtils.getBaseName(originalFilename);
}
```
6. 反射工具类

- org.springframework.util.ReflectionUtils

```java
@Test
public void reflectionTest() {
	// 获取方法
	Method method = ReflectionUtils.findMethod(User.class, "getId");
	// 获取属性
	Field field = ReflectionUtils.findField(User.class, "id");

	// 执行方法
    User user = new User();			
    user.setId(1L);
    Long id = (Long) ReflectionUtils.invokeMethod(method, user);

	// 判断字段是否常量
	Field field = ReflectionUtils.findField(User.class, "id");
	System.out.println(ReflectionUtils.isPublicStaticFinal(field));

}
```

7. Bean 工具类

- `org.springframework.beans.BeanUtils`
- Cglib的 `net.sf.cglib.beans.BeanCopier`

使用BeanUtils：

```java
User user1 = new User();
user1.setId(1L);
user1.setName("ifredom");
user1.setAddress("石家庄");

User user2 = new User();

// 拷贝对象
BeanUtils.copyProperties(user1, user2);
System.out.println(user2);

// 实例化某个类
User user = BeanUtils.instantiateClass(User.class);

// 获取指定类的指定方法
Method declaredMethod = BeanUtils.findDeclaredMethod(User.class, "getId");
System.out.println(declaredMethod.getName());

// 获取指定方法的参数
Method declaredMethod = BeanUtils.findDeclaredMethod(User.class, "getId");
PropertyDescriptor propertyForMethod = BeanUtils.findPropertyForMethod(declaredMethod);
System.out.println(propertyForMethod.getName());
```


使用 [BeanCopier](https://www.cnblogs.com/sunny-miss/p/13138038.html)：

```java
@Test
public void normalCopyTest() {

    final BeanCopier beanCopier = BeanCopier.create(User.class, UserDto.class, false);

    User user = new User();
    user.setAge(18);
    user.setName("ifredom");

    UserDto userDto = new UserDto();

    beanCopier.copy(user, userDto, null);

    Assert.assertEquals(10, userDto.getAge());
    Assert.assertEquals("zhangsan", userDto.getName());
}
```

8. 加密/解密

**org.apache.commons.codec.digest.DigestUtils**

- md5Hex：MD5加密，返回32位字符串
- sha1Hex：SHA-1加密
- sha256Hex：SHA-256加密
- sha512Hex：SHA-512加密
- md5：MD5加密，返回16位字符串

9. Base64 工具类

- java.util.Base64

```java
```

10. HttpStatus Http状态码

- org.springframework.http.HttpStatus