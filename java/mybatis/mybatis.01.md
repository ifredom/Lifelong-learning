# mybatis.01


- resultType: 设置默认映射关系
- resultMap: 设置自定义的映射关系

## ${}字符拼接 和 #{}占位符

- ${} : 字符拼接
- #{} : 占位符 (使用占位符，避免注入)
```xml

    <select id="queryUserByName" resultType="com.cool.mybatis.entity.User">
        select * from t_user where username = #{username}
    </select>


<select id="queryUserByName" resultType="com.cool.mybatis.entity.User">
    select * from t_user where username = '${username}'
</select>
```

#{arg0} #{arg1} #{arg2}
#{param0} #{param1} #{param2}

## Mybatis 内置的别名

## 批量删除

1. 定义mapper接口, SQLmapper.java

```java

// 参数为 List
Integer deleteByIds(List<Integer> ids);
// 参数为 Array
Integer deleteByIds(Integer[] ids);
// 可变长度参数
Integer deleteByIds(Integer... ids);
```

2. 定义SQL语句，SQLmapper.xml
```xml
<delete id="deleteByIds">
    <foreach  collection="array" item="id" operator=",">
        #{id}
    </foreach>
</delete>
```
- collection: 科用类型 list,array，根据`定义mapper接口`的传参决定。当抽象方法的参数超过1个，就一定添加了@Param注解，则取值为@Param注解配置的参数值
- item: 遍历过程中的子集。foreach的子节点可以使用这个值
- separator: 集合中元素的分隔符
- open/close: 遍历生成的代码片段的最左侧字符串/最右侧字符串

## 获取添加功能自增主键

插入SQL语句返回值固定为影响的SQL语句行数。因此将ID插入到传入的参数中，并指定字段为id

```xml
    <insert id="insertNewUser" useGeneratedKeys="true" keyProperty="id">
        insert into t_user
        values (null, #{username}, #{password}, #{age}, #{gender}, #{email})
    </insert>
```

```java
    @Test
    public void testCRUD3() throws IOException {
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        SQLMapper mapper = sqlSession.getMapper(SQLMapper.class);

        // id为null
        User user = new User(null, "fairy", "777", 20, "男", "jhhui@163.com");
        mapper.insertNewUser(user);

        // 此时id中已经有了值
        System.out.println(user);
    }
```

## 下划线转驼峰

- 1. sql语句设置别名
- 2. mybatis配置中设置 mapUnderscoreToCamelCase
- 3. 通过resultMap进行映射

注意，如果查询的表不是所有字段，需要在Entity中添加一个无参构造函数
```java
    <settings>
        <!-- 使用驼峰命名法转换字段。 -->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
```

## 延迟加载

- 多表联查时才存在此功能。只有用到了第二表的数据才会执行第二章表的SQL查询
- 延迟加载一旦设置，所有的查询都会应用
```java
<!--  延迟加载 -->
        <setting name="lazyLoadingEnabled" value="true"/>
```
全局开始延迟后，对于某一功能，不想开启延迟加载的查询， 设置属性fetchTyap属性
```java
    <resultMap id="empAndDeptResultMapByStepOne" type="com.cool.mybatis.entity.Emp">
        <id property="eid" column="eid"/>
        <result property="empName" column="emp_name"/>
        <result property="age" column="age"/>
        <result property="sex" column="sex"/>
        <result property="email" column="email"/>
        <association property="dept" select="com.cool.mybatis.mapper.DeptMapper.selectEmpAndDeptByStepTwo" column="did" fetchType="eager">

        </association>
    </resultMap>
```

## 分步加载。自动延迟
- 多对一 collection标签 oftype属性
```xml
    <resultMap id="deptAdmEmp" type="com.cool.mybatis.entity.Dept">
        <id property="did" column="did"/>
        <result property="deptName" column="dept_name"/>

        <collection property="employees" ofType="com.cool.mybatis.entity.Emp">
            <id property="eid" column="eid"/>
            <result property="empName" column="emp_name"/>
            <result property="age" column="age"/>
            <result property="sex" column="sex"/>
            <result property="email" column="email"/>
        </collection>
    </resultMap>
    <select id="selectDepAndEmp" resultMap="deptAdmEmp">
        select *
        from t_dept dt
                 left join t_emp te on dt.did = te.did
        where dt.did = #{did}
    </select>
```

- 一对多 collection标签 select属性,column属性
```xml
    <resultMap id="deptAdmEmByStepOne" type="com.cool.mybatis.entity.Dept">
        <id property="did" column="did"/>
        <result property="deptName" column="dept_name"/>
        <collection property="employees" select="com.cool.mybatis.mapper.EmpMapper.selectDeptAndEmpByStepTwo" column="did">
        </collection>
    </resultMap>
    <select id="selectDepAndEmpByStepOne" resultMap="deptAdmEmByStepOne">
        select *
        from t_dept dt
        where dt.did = #{did}
    </select>
```