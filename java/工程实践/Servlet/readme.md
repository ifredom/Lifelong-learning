# Servlet

- Servlet 是一个运行于服务端的 Java 程序类，主要采用请求-响应的模式来提供 web 相关服务。
- tomcat 是一个一个 Servlet 容器，可以接受一个 Servlet 服务在内部运行

##

- [在普通 Java 对象中获取 Servlet 对象 ](https://www.jianshu.com/p/b7a7d66c4ef2): ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest()

## Spring 中开启允许自定义 Servlet

- application 添加注解 `@ServletComponentScan`
- 自定义类添加注解 `@WebServlet`，并重写对应请求方法

#### 扩展阅读

- [Tomcat 与 Servlet 之间的关系](https://blog.csdn.net/ckc_666/article/details/79084766)
