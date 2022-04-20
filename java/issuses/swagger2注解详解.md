# 文章目录

https://blog.csdn.net/xiaojin21cen/article/details/78654652

1、maven依赖
2、swagger2 注解整体说明
2.1、请求类的描述
2.2、方法和方法参数的描述
2.3、方法的响应状态的描述
2.4、对象的描述
3、请求类的描述
3.1、@Api：请求类的说明
3.2、示例：
4、方法和方法参数的描述
4.1、@ApiOperation：方法的说明
4.2、@ApiImplicitParams、@ApiImplicitParam：方法参数的说明
4.3、示列：
5、响应状态的描述
5.1、@ApiResponses、@ApiResponse：响应状态状态的说明
5.2、 示例：
6、对象的描述
6.1、@ApiModel：对象的整体说明
6.2、@ApiModelProperty 对象中每个参数的说明
6.3、示例：
1）入参是对象，即 `@RequestBody` 时， 用于封装请求
2）返回值是对象，即 `@ResponseBody` 时，用于返回值对象的描述。
3） UserLoginVO 和 JsonResult 的使用
6.4、swagger2 中查看：
7、默认的地址
1、maven依赖
<dependency>
	<groupId>io.springfox</groupId>
	<artifactId>springfox-swagger2</artifactId>
	<version>2.9.2</version>
</dependency>
<dependency>
	<groupId>io.springfox</groupId>
	<artifactId>springfox-swagger-ui</artifactId>
	<version>2.9.2</version>
</dependency>

<dependency>
	<groupId>com.github.xiaoymin</groupId>
	<artifactId>swagger-bootstrap-ui</artifactId>
	<version>1.9.6</version>
</dependency>

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
（注：当前2018年，请使用最新的依赖）

2、swagger2 注解整体说明
2.1、请求类的描述
注解	说明
@Api	对请求类的说明
2.2、方法和方法参数的描述
注解	说明
@ApiOperation	方法的说明
@ApiImplicitParams	方法参数的说明；
@ApiImplicitParam	用于指定单个参数的说明。
2.3、方法的响应状态的描述
注解	说明
@ApiResponses	方法返回值的说明 ；
@ApiResponse	用于指定单个参数的说明。
2.4、对象的描述
注解	说明
@ApiModel	用在JavaBean类上，说明JavaBean的 整体用途
@ApiModelProperty	用在JavaBean类的属性上面，说明此属性的的含议
3、请求类的描述
3.1、@Api：请求类的说明
@Api：放在 请求的类上。与 @Controller 并列，说明类的作用，如用户模块，订单类等。
	tags="说明该类的作用"
	value="该参数没什么意义，所以不需要配置"
1
2
3
3.2、示例：
@Api(tags="订单模块")
@Controller
public class OrderController {

}
1
2
3
4
5
@Api 其它属性配置：

属性名称	备注
value	url的路径值
tags	如果设置这个值、value的值会被覆盖
description	对api资源的描述
basePath	基本路径
position	如果配置多个Api 想改变显示的顺序位置
produces	如, “application/json, application/xml”
consumes	如, “application/json, application/xml”
protocols	协议类型，如: http, https, ws, wss.
authorizations	高级特性认证时配置
hidden	配置为true ，将在文档中隐藏
4、方法和方法参数的描述
4.1、@ApiOperation：方法的说明
@ApiOperation："用在请求的方法上，说明方法的作用"
	value="说明方法的作用"
	notes="方法的备注说明"
1
2
3
4.2、@ApiImplicitParams、@ApiImplicitParam：方法参数的说明
@ApiImplicitParams：用在请求的方法上，包含一组参数说明
	@ApiImplicitParam：对单个参数的说明	    
	    name：参数名
	    value：参数的说明、描述
	    required：参数是否必须必填
	    paramType：参数放在哪个地方
	        · query --> 请求参数的获取：@RequestParam
	        · header --> 请求参数的获取：@RequestHeader	      
	        · path（用于restful接口）--> 请求参数的获取：@PathVariable
	        · body（请求体）-->  @RequestBody User user
	        · form（普通表单提交）	   
	    dataType：参数类型，默认String，其它值dataType="Integer"	   
	    defaultValue：参数的默认值
1
2
3
4
5
6
7
8
9
10
11
12
13
4.3、示列：
@Api(tags="用户模块")
@Controller
public class UserController {

	@ApiOperation(value="用户登录",notes="随边说点啥")
	@ApiImplicitParams({
		@ApiImplicitParam(name="mobile",value="手机号",required=true,paramType="form"),
		@ApiImplicitParam(name="password",value="密码",required=true,paramType="form"),
		@ApiImplicitParam(name="age",value="年龄",required=true,paramType="form",dataType="Integer")
	})
	@PostMapping("/login")
	public JsonResult login(@RequestParam String mobile, @RequestParam String password,	@RequestParam Integer age){
		//...
	    return JsonResult.ok(map);
	}
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
5、响应状态的描述
5.1、@ApiResponses、@ApiResponse：响应状态状态的说明
@ApiResponses：响应状态的说明。是个数组，可包含多个 @ApiResponse
	@ApiResponse：每个参数的说明
	    code：数字，例如400
	    message：信息，例如"请求参数没填好"
	    response：抛出异常的类
1
2
3
4
5
5.2、 示例：
@Api(tags="用户模块")
@Controller
public class UserController {

	@ApiOperation("获取用户信息")
	@ApiImplicitParams({
		@ApiImplicitParam(paramType="query", name="userId", dataType="String", required=true, value="用户Id")
	}) 
	@ApiResponses({
		@ApiResponse(code = 200, message = "请求成功"),
		@ApiResponse(code = 400, message = "请求参数没填好"),
		@ApiResponse(code = 404, message = "请求路径没有或页面跳转路径不对")
	}) 
	@ResponseBody
	@RequestMapping("/list")
	public JsonResult list(@RequestParam String userId) {
		...
		return JsonResult.ok().put("page", pageUtil);
	}
}
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
6、对象的描述
6.1、@ApiModel：对象的整体说明
@ApiModel 经常用于请求的入参对象和 响应返回值对象的描述。

入参是对象，即 @RequestBody 时， 用于封装请求（包括数据的各种校验）数据；
返回值是对象，即 @ResponseBody 时，用于返回值对象的描述。
@ApiModel(description = "用户登录")
public class UserLoginVO  implements  Serializable {

}
1
2
3
4
6.2、@ApiModelProperty 对象中每个参数的说明
@ApiModelProperty 用于每个属性上面，说明属生的含义。

@ApiModel
public class UserLoginVO  implements  Serializable {

	@ApiModelProperty(value = "用户名",required=true)	
	private String username;	
}
1
2
3
4
5
6
6.3、示例：
1）入参是对象，即 @RequestBody 时， 用于封装请求
@ApiModel(description = "用户登录")
public class UserLoginVO implements Serializable {

	private static final long serialVersionUID = 1L;

	@ApiModelProperty(value = "用户名",required=true)	
	private String username;

	@ApiModelProperty(value = "密码",required=true)	
	private String password;
	
	// getter/setter省略
}
1
2
3
4
5
6
7
8
9
10
11
12
13
2）返回值是对象，即 @ResponseBody 时，用于返回值对象的描述。
@ApiModel(description= "返回响应数据")
public class JsonResult implements Serializable{

	@ApiModelProperty(value = "是否成功",required=true)
	private boolean success=true;	
	
	@ApiModelProperty(value = "错误码")
	private Integer errCode;
	
	@ApiModelProperty(value = "提示信息")
	private String message;
	
    @ApiModelProperty(value = "数据")
	private Object data;
		
	/* getter/setter 略*/
}

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
3） UserLoginVO 和 JsonResult 的使用
UserLoginVO 作为入参对象。
JsonResult 作为返回值对象。

@Api(tags="用户模块")
@Controller
public class UserController {

	@ApiOperation(value = "用户登录", notes = "")
	@ResponseBody
	@PostMapping(value = "/login")
	public JsonResult login(@RequestBody UserLoginVO userLoginVO) {
		User user=userSerivce.login(userLoginVO);
		return new JsonResult("1","成功");
	}
}
1
2
3
4
5
6
7
8
9
10
11
12
6.4、swagger2 中查看：

