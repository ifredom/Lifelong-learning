# [mvc](https://blog.csdn.net/weixin_48893653/article/details/120822276)

前后端分离与不分离的区别在于:

1. 分离之前后端将视图渲染后（比如对ModelAndView进行视图解析器渲染成真正的视图）再返回给前端；
2. 分离之后后端仅返回前端所需的数据，不再渲染HTML页面，不再控制前端的效果。
3. 在前后端分离的应用模式中，前端与后端的耦合度相对较低，分离之后Web端的后端可以和app共用一套接口或api，不像从前那样各用一套。
4. 因此,前后端分离后，视图解析器是d不需要的!

## [Spring MVC 配置类](https://blog.csdn.net/zpx_Smart/article/details/124559942)

虽然视图被剥离出去了，但是MVC提供的配置类依然有用武之地。

- **WebMvcConfigurer**
- **WebMvcConfigurerAdapter**
- **WebMvcConfigurationSupport**
- **WebMvcAutoConfiguration**


1. WebMvcConfigurer是一个接口interface,定义了许多MVC相关的方法
2. WebMvcConfigurerAdapter 是 `WebMvcConfigurer`的一个实现类。由于在Java8中可以使用default关键字设置默认方法，所以这个这个类已经被废弃
3. WebMvcConfigurationSupport 是 mvc 的基本实现并包含了WebMvcConfigurer接口中的方法
4. WebMvcAutoConfiguration 是 mvc 的自动装配类并部分包含了WebMvcConfigurer接口中的方法
5. 如果在springboot项目中没有使用到以上类，那么会自动启用 WebMvcAutoConfiguration 类做自动加载,用于加载项目配置，比如静态资源文件的访问

目前在springboot项目中，前后端分离的趋势下，通常只会在配置静态资源和[设置跨域](http://www.manongjc.com/detail/10-sxolgdmmifmwbcl.html)问题时会使用使用到 `WebMvcConfigurationSupport`


springboot默认会从以下四个文件夹路劲读取静态资源：

- /static
- /public
- /resources
- /META-INF/resources