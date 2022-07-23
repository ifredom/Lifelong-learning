# [Tomcat](https://tomcat.apache.org/tomcat-10.0-doc/index.html)

本文适合对 Tomcat, Spring Servlet 不了解，理解不深的用户阅读。

- 什么是tomcat？
> Tomcat是一个Java应用程序，作用是为用户提供`通过网络访问网站`的功能，专业术语名称为`网络服务器`。
> > 1.Tomcat如何是实现允许用户通过网络访问的功能？
> > 2.Tomcat 与 Servlet，JSP 关系？
> > 3.如何创建一个Tomcat程序
> > 4.关于Servlet需要了解的内容

1. [tomcat下载](https://tomcat.apache.org/whichversion.html)

### 1.Tomcat如何是实现允许用户通过网络访问网站的功能？

Tomcat是一个 Servlet/JSP 容器，它通过内部的程序 Servlet 来让用户访问网站。


首先需要说一下什么是网站？网站就是一堆Html文件，JS文件，CSS文件，Image文件，又将它们统称为网站静态资源。
你在本地，自己可以通过浏览器直接打开Html文件，Html又自动去加载JS,CSS文件。而其他人却不能看到你的网站。
Tomcat则是当你在浏览器地址栏输入一个网址时，`浏览器发送一个网络请求到服务器`，服务器收到请求后，然后返回一堆数据。浏览器根据返回的数据，像画画一样在屏幕上进行绘制，转化为肉眼可见的页面。


> 就像港口一样：Tomcat是海港，而Serlvet是一个个集装箱，集装箱内装的物品是JSP。一条又一条的运输船运来了集装箱到海港卸货，海港对集装箱处理后，再次将新的集装箱还给运输船。
> Tomcat就像一个完整建设的海港，只要收到了集装箱，它就知道应该怎么去处理并返回一个新的集装箱。
> 

### 2. Tomcat 与 Servlet，JSP 关系

Tomcat提供了一些功能，专门用于加载运行Servlet程序。

就像： 
- 运输船：“嗨，港口。我运来了一个集装箱”
- 港口： “好的，我叫Servlet来处理这个集装箱”
- Servlet： 按照港口设定的规则，运走集装箱去处理里面的JSP文件。


### 3. 如何创建一个Tomcat程序

在上面，我们已经Tomcat是做什么的了，那么我们应该如何是创建一个Tomcat呢？

首先你要牢牢记住你是在干什么，你是在创建一个能够让用户通过浏览器远程访问网站的应用程序，而这个应用程序它只是恰好命名为Servlet。

或者你也可以 创建一个能够让用户通过浏览器远程访问网站的应用程序后，将其命名为猫，狗，这都没关系。


接下来要告诉你的东西需要你更加专注。

因为我们是让用户通过自己的浏览器，访问服务器上的网站。这一过程可以简单叙述为：
- 用户在浏览器地址栏->
- 浏览器发送一个网络请求到服务器-> 
- 服务器处理请求并返回数据给浏览器->
- 浏览器收到返回数据，并将其绘制出来

所以接下来需要考虑的是运行在服务器上的 Tomcat 如何处理浏览器发送来的网络请求。

在今天，你可以简单理解为浏览器发送的都是Http请求，（Http请求理解为一个有书写要求的文件：第一行书写的是名称，第二行书写今天的日期，第三行书写...）,所以问题就转变为了

- Tomcat如何处理Http请求？

Tomcat 如何处理Http请求呢?就像我们上面说的，Http是有固定格式的，第一行是名称，第二行是日期，第三行...,
所以我们只需要从Http文件中把第一行数据读取出来，第二行数据读取出来...

所以我们的问题再次转换为

- 如何从Http文件中读取数据？

还记得Tomcat是什么吗，它是海港，浏览器发送的Http是什么，是集装箱。集装箱用什么处理呢？没错，就是Servlet。问题再次转化：

- **Servlet 如何处理接收的Http请求？**

集装箱处理完了后，还需要给运输船一个新的集装箱，注意返回的也是集装箱，所以这里产生了一个新问题：

- **Servlet 如何返回Http请求？**

集装箱里装的是JSP，那么又有一系列新问题了：

- 1.Servlet怎么知道Tomcat什么时候找它？
- 2.是提前创建好Servlet，等候Tomcat呼叫，还是收到呼叫后再创建？
- 3.Http可能装的是水果，可能是衣服，也可能是石油。Servlet应该如何去处理 Http 内不同的数据?
- 3.Servlet处理完成后，返回了新的Http后怎么处理？是继续存在，还是销毁呢？

事情到了这里，可以发现其实大部分Http的处理工作都是Servlet再处理，专人专岗，那么就让Servlet专门来处理Http请求。 

Tomcat呢，将他的职责清理一下，就专门负责调度Servlet不就可以了。嗯，看起来很像我们的经理，他只需要张张嘴，干活的人跑断腿。

创建一个Tomcat，就像创建一个海港，是一个巨大的工程。

占据多大的内存，如何接收处理Http的任务并把任务吩咐给Servlet去干活，是安排Servlet一直等待，还是干完了就把炒鱿鱼...这里面涉及非常复杂的内容，幸运的是 Apache已经为我们把这一切都搞定了，制作好了 [Apache Tomcat](https://tomcat.apache.org/tomcat-10.0-doc/index.html)，你只需要下载并安装，就可以让这个软件来处理我们最初的目的：


> 让 `Apache Tomcat` 为用户提供`通过网络访问网站`的功能.

## 4.关于Servlet需要了解的内容

我们已经知道 Servlet 是 Tomcat 内的打工仔，Http请求都是它在处理，它也知道怎么处理。在实际的应用程序开发过程中，有时候，需要处理一些特殊的数据，这个时候就需要我们个告诉Servlet如何按照我们想要的要求去处理特殊数据。

以下用`Java Spring项目`作为演示：

我们知道，Spring项目内置了Tomcat，在实际开发当中，任何一个Http请求都会由Tomcat接收，然后交给Servlet处理，我们希望Servlet去处理特定的数据，只需要让一个类继承HttpServlet即可。

也就是你的关注点只需要集中在 Tomcat 提供的类 HttpServlet上，编写一个继承了HttpServlet的类文件即可

```java
@WebServlet("/myServlet")
public class MyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("自定义 servlet 对 Http请求 Get 方法的处理方式" );

        resp.setContentType("text/html");
        PrintWriter pw = resp.getWriter();
        pw.write("特殊数据");
        pw.flush();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        super.doGet(req, resp);
        System.out.println("自定义 servlet 对 Http请求 Post 方法的处理方式");
    }
}

```

当我们编写好程序后，访问你的本机地址 `http://localhost:8080/myServlet`，你会发现浏览器会显示`特殊数据`四个字。这意味着，你可以在这里处理任何你希望的特殊数据。


### [Tomcat面试题](https://zhuanlan.zhihu.com/p/345376774)

本文一共六道关于tomcat的题目：

- Tomcat的缺省端口是多少，怎么修改？
- tomcat 有哪几种Connector 运行模式(优化)？
- Tomcat有几种部署方式？
- tomcat容器是如何创建servlet类实例？用到了什么原理？
- tomcat 如何优化？熟悉tomcat的哪些配置？

### 参考阅读

- [Apache Tomcat 10 官方文档](https://tomcat.apache.org/tomcat-10.0-doc/index.html)
- [Servlet 中文文档](https://www.runoob.com/servlet/servlet-tutorial.html)
- [Spring Servlet 官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/web.html#web.servlet.embedded-container)
- [Java Servlet 6.0 Specification 文档与计划](https://projects.eclipse.org/projects/ee4j.servlet/releases/6.0)
- [bravo 详解Servlet](https://www.zhihu.com/question/21416727)
- [jakarta-servlet-spec-5.0](https://jakarta.ee/zh/specifications/servlet/5.0/jakarta-servlet-spec-5.0.pdf)
- [Apache Project List](https://projects.eclipse.org/list-of-projects)
