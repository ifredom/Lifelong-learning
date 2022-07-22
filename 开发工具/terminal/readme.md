# 命令行


## terminal
- terminal是一个管理容器，用来管理cmd,powershell,cmder的。
- terminal风格是由启动的命令行软件本身决定。
- 快捷键：  win+Q  ->wt


## scoop1
- [scoop](https://scoop.sh/)是window上的[包管理工具](https://github.com/ScoopInstaller/Scoop).
> 如果要安装像gcc、git等一些需要手动配置相关参数的工具，需要先去官网下载安装程序，点击安装，之后还需要配置，不仅过程麻烦，而且工具多了之后整理起来也相当不容易，配置也很杂，整个电脑就像被污染了一样。
> 比如我想安装gcc，只需要输入`scoop install gcc`, scoop会把软件下载、安装、配置等步骤全部帮你做完

下载:
```bash
> iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
```

提速：scoop下载软件大多是从外链下载，可以安装aria2来提升下载
```bash
> scoop install aria2

# 禁用
> scoop config aria2-enabled false
```

查看安装模块路径
```bash
> scoop prefix oh-my-posh
```

- 下载字体，并且自动安装配置
```bash
scoop search FantasqueSansMono-NF
> scoop bucket add 'nerd-fonts'
# 下载字体
>  scoop install FantasqueSansMono-NF
```

## Cmder

- 1.[下载](https://github.com/cmderdev/cmder/releases)解压即可使用
- 2.优化操作。开启自动隐藏 setting --> General --> Quake style --> 勾选Quake style slide down -->ctrl+\`
- 3.注册鼠标右键.在cmder安装目录下执行： `./Cmder.exe /REGISTER ALL`

## window powershell 5

[powershell文档](http://www.zyiz.net/tutorial/detail-6815.html)


> 1.`oh-my-posh`：它是 PowerShell 主题框架，可以为PowerShell提示符设置主题，并且自带多个主题。
> 2.`posh-git`：用于显示Git状态指示（它不包含git） Posh-Git（PowerShell Git）将在PowerShell 提示符下为您提供git存储库的目录中相关信息。
> 3.`Get-ChildItemColor` ：为 PowerShell 的输出添加颜色（比如为 ls 的输出上色）

上面三个模块需要通过 NuGet 安装，所以先以管理员方式打开 PowerShell，然后分别运行下面的两条命令：
```bash
> Install-PackageProvider NuGet -MinimumVersion '2.8.5.201' -Force
> Set-PSRepository -Name PSGallery -InstallationPolicy Trusted
```

- 接下来安装这3个模块
```bash
> Install-Module -AllowClobber posh-git 
> Install-Module oh-my-posh 
> Install-Module -AllowClobber Get-ChildItemColor
```

- 检查一下配置文件是否存在，如果不存在可以手动创建 
```bash
> if (!(Test-Path -Path $PROFILE )) { New-Item -Type File -Path $PROFILE -Force }
# 通过如下命令编辑该配置文件
> notepad $PROFILE
```

- 创建配置文件[配置文件](https://github.com/JanDeDobbeleer/oh-my-posh/discussions/460)并写入下面的配置内容
- `C:\Users\cool\Documents\WindowsPowerShell\Microsoft.PowerShell_profile.ps1`


- 查看现在配色主题
```bash
scoop install colortool
```
[后续步骤](https://zhuanlan.zhihu.com/p/352882990)



## powershell 7

> 注意是操作 powershell 7,不是5

- 1.window10上默认安装 **powershell 5.1**
- 2.目前最新版本是7.2.5，手动从网上下载一个powershell7.2.5
- 3.如果你下载的版本低于最新版本，一旦打开就会提示你更新版本

---

- 查看版本号：
```bash
> $PSVersionTable.PSVersion
```

- 下载最新版本（powerShell7-latest）:
```bash
> iex "& { $(irm https://aka.ms/install-powershell.ps1) } -UseMSI -Quiet"
```

- 查看所有安装模块
```bash
> Update-Module
> Get-Module
```

- 安装 PowerShell 主题管理工具 [oh-my-posh](https://ohmyposh.dev/docs/installation/windows)：
```bash
> scoop install https://github.com/JanDeDobbeleer/oh-my-posh/releases/latest/download/oh-my-posh.json
```
- 主题位于模块路径themes文件夹下 **C:\Users\cool\scoop\apps\oh-my-posh\8.22.0\themes**

- 安装 PowerShell 主题管理工具 posh-git：
管理员模式打开 `powershell 7`
```bash
> Install-Module -AllowClobber posh-git 
> Install-Module oh-my-posh 
> Install-Module -AllowClobber Get-ChildItemColor
```

- 创建配置文件
`C:\Users\cool\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`
并写入下面的配置内容


### 配置文件 Microsoft.PowerShell_profile.ps1

```bash
Import-Module Get-ChildItemColor
Set-Alias l Get-ChildItem -option AllScope
Set-Alias ls Get-ChildItemColorFormatWide -option AllScope
Import-Module posh-git
Import-Module oh-my-posh
Set-PoshPrompt -Theme JanDeDobbeleer
```

### Ternimal配置[字体文件](https://link.zhihu.com/?target=https%3A//github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/Meslo.zip)
```json
"profiles":{
	"defaults":{
		"font":
		{
	    	"face": "MesloLGM NF"
		}
	}
}
```