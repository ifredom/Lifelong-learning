# java -renren-fast 登录接口 实战修改

> 所有注解都是控制反转，容器载入Bean!

## 验证码业务service

@TableId(type = IdType.AUTO)

- IdType调用的属性有很多 生成主键策略
public enum IdType {
    AUTO(0),      //数据库id自增   不用自己设置id(数据库中id也要设置为自增)
    NONE(1),   //未设置主键
    INPUT(2),   //手动输入    需要自己配置id
    ASSIGN_ID(3),
    ASSIGN_UUID(4),
    /** @deprecated */
    @Deprecated
    ID_WORKER(3),          //默认的全局唯一id    不用自己设置id
    /** @deprecated */
    @Deprecated
    ID_WORKER_STR(3),      //ID_WORKER  字符串表示法
    /** @deprecated */
    @Deprecated
    UUID(4);     //全局唯一id uuid


## Java验证码生成工具 Producer



##
## @Data 和 @Mapper

@Data 将数据库表字段进行一一映射
@Mapper 将数据库数据操作 CRUD进行简化，注入get,set方法


## @IService 和 @ServiceImpl

@IService 注入数据操作方法， 将Dao 再次封装


## ShiroConfig 接口过滤

filterMap.put("/mycaptcha.jpg", "anon");		