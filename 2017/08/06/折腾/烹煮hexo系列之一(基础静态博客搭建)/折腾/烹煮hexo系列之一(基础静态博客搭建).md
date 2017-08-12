---
title: 烹煮hexo系列之一(基础静态博客搭建)
tags: hexo
categories: 折腾
---

### 材料

1. nodejs
2. git
3. 一个新的github仓库
4. hexo博客程序

### hexo博客简介

hexo博客是使用nodejs构建的一个轻量级的静态博客，相当于一个markdown解析器，我们只需要把我们写的markdown文件放到指定的文件夹中，再通过一些配置，在本地使用nodejs构建生成普通的html页面。

### hexo博客原理

要搭建hexo博客，首先要在本地搭建好环境，搭建一个博客程序，为什么要搭建本地环境？这令人不解！博客不是应该安装到服务器上的吗？
普通的WordPress博客是安装到服务器上的，运行，页面文件生成都是在服务器上的。但是hexo博客的特点是在本地把博客页面构建出来，生成好基本的html静态文件，再上传到github上托管，根据github的特定要求就可以访问github仓库的静态文件了。

### 本地环境搭建

首先安装nodejs，进入 [nodejs中文官网](http://nodejs.cn/)，下载最新版的nodejs

然后安装git ,打开[git官网](https://git-scm.com/downloads)，下载你系统对应的版本

接着你就在可以在命令行中使用 `npm install hexo-cli -g` 安装hexo博客构建工具了

至此本地环境已经搭建完毕

### 创建github仓库

登录你的github，然后点击new repository ，创建一个新的仓库，命名为 xxx(github用户名).github.io。一定要按照这个格式来命名你的仓库，否则最后你不能正常访问你的hexo博客。很多人不知道用户名到底是哪个，其实很简单，你登录github之后，你可以在浏览器的url中看到你的用户名。
比如我登录之后浏览器的url为 http://github.com/Kuohao-wu/ , 那么我的用户名就是 Kuohao-wu。

### 构建hexo博客

使用命令行进行操作

```shell
	mkdir blog && cd blog ## 创建blog目录，并且进入
	hexo init  ## 初始化hexo，hexo会从github中下载hexo博客构建工具
	npm install ## 安装nodejs依赖
```

### 修改hexo默认配置

等依赖都安装好之后，我们可以进行配置了，在blog目录中找到配置文件 *_config.yml*
修改其中的一些配置

```shell
# Site  修改网站的基本信息
  title: '国豪的小站'
  	subtitle:
  	description: 专注于折腾各种东西的博客
  	uthor: kuohao
  	language: zh-CN

 # Deployment 最重要的是修改你的github仓库地址，不然提交不上去
  deploy:
  	type: git
  	repository: http://github.com/Kuohao-wu/kuohao-wu.github.io.git
  	branch: master
```

### 构建、本地试运行

我们配置好之后，可以使用一些命令来操作hexo

```shell
	hexo help    ## hexo的命令列表
	hexo generate 	## 构建hexo静态文件，就是把你的markdown文件构建成html静态页面, 可以简写成hexo g
	hexo server 		## 本地预览，hexo会在hexo项目的根目录启动一个服务器，你可以的本地浏览器打开便可以预览hex生成的静态文件，可以简写成hexo s
	hexo deploy   ## 把本地的hexo静态文件部署到github上，可以简写成 hexo d
```

第一次使用deployd的时候需要输入github账号密码进行登录。要注意的一点是，修改了hexo配置或者别的东西之后，在使用hexo server 和 hexo deploy之前都应该使用hexo generate一下，重新构建静态文件，不然没有效果。

### 编写博客

hexo要发布文章，需要我们在本地写好markdown文件，然后放在根目录下的source/_posts下。然后使用 hexo g 构建，生成静态文件，然后再使用hexo deploy同步到github上就行了，推荐两款我比较中意的markdown编辑器，CMDmarkdown和马克飞象，两款编辑器都不错。

### 更换heox主题

有时候看到非常好看的hexo主题，再看看自己那个丑哭的主题，就像有换主题的冲动。hexo换主题也超级简单的。

```shell
	cd themes ## 进入根目录下的themes文件夹
	git clone your theme github address ## clone你喜欢的主题下来
	cd your theme fold ## 进入你的主题文件夹
	npm install ## 安装主题nodejs依赖
	cd .. ##返回上一层
	vi _config.yml ##修改hexo配置
```

在hexo配置中找到修改以下配置

```shell
	# Extensions
	## Plugins: https://hexo.io/plugins/
	## Themes: https://hexo.io/themes/
	theme: hexo-theme-mdui. ##这里改成你喜欢的主题名称，就是你clone下来那个文件夹的名称
```

```shell
	hexo g 	## 重新构建
	hexo d 	## 更新到github仓库
```

在浏览器中访问你的 xxx.github.io就可以看到修改之后的样式了，不过可能需要等等，大概十来分钟，修改才会生效。

### 使用alias别名来简化工作
我们在编写博客部署到github的时候，常常需要使用以下命令 `hexo g && hexo d` 来部署，每次都敲这么长的一段就太累了，我们可以通过alias来简化命令。alias是linux和mac自带的特性，但是windows就没有了，要实现相同的效果需要编写bat脚本，实在太麻烦了。所以我推荐windows的用户使用 **[cmd](http://cmder.net/)** 来进行命令行操作，cmder集成了git，ssh，大部分常用的linux命令，包括alias，用起来十分顺手而且比windows的cmd命令窗口好看很多。

mac和linux下修改家用户目录下的.bashrc文件，mac使用zsh的修改.zshrc文件

配置alias命令
```shell
	alias gs='hexo g && hexo s'  # 构建hexo静态页面文件并在根目录开启一个服务器
	alias gd='hexo g && hexo d'	 # 构建hexo静态页面文件并部署到github上
```
然后使用 `source ~/.bashrc(.zshrc)` ，使之马上生效，就可以使用 ***gs* 和 **gd**命令了。


