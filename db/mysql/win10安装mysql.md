1. [下载安装](https://mirrors.ustc.edu.cn/mysql-ftp/Downloads/MySQL-8.0/) 选择版本 ：mysql-8.0.27-winx64.msi

2. 安装选择 custom， 选择安装的路径，我本地安装地址为： D:\allsofoware\mysql8

3. 手动新建一个**文件夹**，名称为 data ,位置在刚刚安装的 mysql 目录下：D:\allsofoware\mysql8\data

4. 手动新建一个文件，名称为 my.ini,位置在刚刚安装的 mysql 目录下：D:\allsofoware\mysql8\my.ini

5. 打开 my.ini 添入以下内容

```ini
[client]
# 设置mysql客户端默认字符集
default-character-set=utf8

[mysqld]
# 设置mysql的默认端口
port=3306
# 设置mysql的安装目录
basedir=D:\\allsofoware\\mysql8
# 设置 mysql数据库存放目录
datadir=D:\\allsofoware\\mysql8\\data
# 允许最大连接数
max_connections=20
# 服务端使用的字符集默认为8比特编码的latin1字符集
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
```

6. 使用管理员模式打开 CMD， 切换到 mysql 安装目录的 bin 目录下执行`mysqld --initialize-insecure`。（这一步是初始化 mysql 设置）

```bash
D:\allsofoware>mysql8>bin> mysqld --initialize-insecure
```

7. 继续在 mysql 安装目录的 bin 目录下执行`mysqld --verbose --help > d:\work\mysql_win_help_docs.txt`（这一步是设置 mysql 将帮助文档都输出到指定的的文件**mysql_win_help_docs.txt**中）

```bash
D:\allsofoware>mysql8>bin> mysqld --verbose --help > d:\work\mysql_win_help_docs.txt
```

8. 安装 mysql 服务。

```bash
D:\allsofoware>mysql8>bin> mysqld install
```

安装成功后， 就在当前目录下 输入 **services.msc**，在打开的服务控制台中按下按键 M， 如果出现了 Mysql,那么说明安装 mysql 服务成功，成功在 windows 系统中注册。

9. 启动 mysql 服务。

```bash
# 启动服务
net start mysql

# 无需执行。停止服务
net stop mysql
```

10. 大功告成，接下里就开始链接到数据库吧。新打开一个 CMD,输入
    **mysql -uroot -p -P 3306**，不输入密码直接回车，出现 mysql>那么就是成功连接到数据库了

> 提示： 在第 10 步骤为什么能够链接到数据库，其实就是使用了前面创建的的 my.ini 这个配置文件，用户名为 root,密码没有设置默认为空，端口为默认的 3306。
