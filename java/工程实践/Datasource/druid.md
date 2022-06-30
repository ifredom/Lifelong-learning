# druid 数据库连接池

导入pom仓库坐标
```yml
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.8</version>
</dependency>
```

## druid 和 druid-spring-boot-starter区别

- druid-spring-boot-starter 是在druid基础上进行了一次封装，专门用来整合spring-boot项目；
- druid 需要自己手动编写配置类并注入到bean中

结论：使用 druid-spring-boot-starter ！

## 使用 druid-spring-boot-starter

一共有2步.(注意不用再编写配置类)

- 1. pom中导入坐标，3个坐标
- 2. application.yml文件中写入配置信息，注意格式
- 3. 编写一个测试类验证

---

1. pom中导入坐标，3个坐标

```yml

<!--   数据库连接   -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.2.8</version>
</dependency>
```

2. application.yml文件中写入配置信息

```yml
server:
  port: 8998

spring:
  application:
    name: reggie
  datasource:
    # JDBC配置：
    type: com.alibaba.druid.pool.DruidDataSource
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/firstdemo?serverTimezone=UTC&useUnicode=true&characterEncoding=utf-8
    username: root
    password: 123456

    # 连接池配置：
    druid:
      initial-size: 10   # 初始化大小
      min-idle: 5     # 最小空闲连接个数
      max-active: 20    # 最大连接个数
      max-wait: 60000   # 配置获取连接等待超时的时间
      pool-prepared-statements: true  # 打开PSCache，并且指定每个连接上PSCache的大小
      max-pool-prepared-statement-per-connection-size: 20
      time-between-eviction-runs-millis: 60000    # 配置间隔多久才进行一次监测，监测需要关闭的空闲连接，单位时毫秒
      min-evictable-idle-time-millis: 60000       # 配置一个连接在池中最小生存的时间

      #validation-query: SELECT 1 FROM DUAL
      test-while-idle: true            # 建议配置为true，不影响性能，并且保证安全性。如果空闲时间大于timeBetweenEvictionRunsMillis，执行validationQuery检测连接是否有效。
      test-on-borrow: false            # 申请连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能
      test-on-return: false            # 归还连接时执行validationQuery检测连接是否有效，做了这个配置会降低性能

      # 启用Druid内置的Filter，会使用默认的配置。可自定义配置，见下方的各个filter节点。
      filters: stat,wall

      # StatViewServlet监控器。开启后，访问http://域名/druid/index.html
      stat-view-servlet:
        enabled: true # 开启 StatViewServlet，即开启监控功能
        login-username: daniel # 访问监控页面时登录的账号
        login-password: 1234 # 密码
        url-pattern: /druid/* # Servlet的映射地址，不填写默认为"/druid/*"。如填写其它地址，访问监控页面时，要使用相应的地址
        reset-enable: false # 是否允许重置数据（在页面的重置按钮）。（停用后，依然会有重置按钮，但重置后不会真的重置数据）
        allow: 192.168.2.29,192.168.1.1 # 监控页面访问白名单。默认为127.0.0.1。与黑名单一样，支持子网掩码，如128.242.127.1/24。多个ip用英文逗号分隔
        deny: 22.1.2.3 # 监控页面访问黑名单

      # 配置 WebStatFilter（StatFilter监控器中的Web模板）
      web-stat-filter:
        enabled: true # 开启 WebStatFilter，即开启监控功能中的 Web 监控功能
        url-pattern: /* # 映射地址，即统计指定地址的web请求
        exclusions: '*.js,*.gif,*.jpg,*.png,*.css,*.ico,/druid/*' # 不统计的web请求，如下是不统计静态资源及druid监控页面本身的请求
        session-stat-enable: true # 是否启用session统计
        session-stat-max-count: 1 # session统计的最大个数，默认是1000。当统计超过这个数，只统计最新的
        principal-session-name: userName # 所存用户信息的serssion参数名。Druid会依照此参数名读取相应session对应的用户名记录下来（在监控页面可看到）。如果指定参数不是基础数据类型，将会自动调用相应参数对象的toString方法来取值
        principal-cookie-name: userName # 与上类似，但这是通过Cookie名取到用户信息
        profile-enable: true # 监控单个url调用的sql列表（试了没生效，以后需要用再研究）


      filter:
        stat:
          log-slow-sql: false
          slow-sql-millis: 1000
          merge-sql: false
        wall:
          config:
            multi-statement-allow: true
```

3. 编写一个测试类验证

```java
package com.cool.reggie;


import com.alibaba.druid.pool.DruidDataSource;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import javax.annotation.Resource;
import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;


/**
 * @Author ifredomvip@gmail.com
 * @Date 2022/6/30 9:46
 * @Version 1.0.0
 * @Description
 **/
@SpringBootTest
public class DruidStarterTest {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @Resource
    private DataSource dataSource;


    @Test
    public void testDruidConnector() throws SQLException, InstantiationException, IllegalAccessException {
        DruidDataSource druidDataSource = (DruidDataSource) dataSource;
        System.out.println(druidDataSource.getUsername());
        System.out.println(druidDataSource.getPassword());
        System.out.println(dataSource.getClass());

        Connection connection = dataSource.getConnection();
        System.out.println(connection);
        connection.close();

        List<Map<String, Object>> maps = jdbcTemplate.queryForList("select * from student");
        for (Map<String, Object> map : maps) {
            System.out.println(map);
        }

    }

}

```