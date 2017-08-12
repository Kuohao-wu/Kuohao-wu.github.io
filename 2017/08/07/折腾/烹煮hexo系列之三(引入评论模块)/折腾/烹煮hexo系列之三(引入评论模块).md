---
title: hexo搭建个人技术博客之三(引入评论模块)
tags: hexo
categories: 折腾
---

### 材料
1. github账号
2. gitment
3. 耐心


### 前言

我们所搭建的hexo博客是托管的github的静态页面,俗称movergithub pages，所以没有评论这种动态网站的交互功能，但是有第三方的插件可以实现评论能实现评论功能，就是把评论的数据放在他们的数据库，存取都在他们的服务器，我们只管调用api就行了，后来我去了解一下，常用的多说评论，网易云跟帖好像都暂停服务了，官网都进不去了。后来又了解到有人利用github issues来实现了一个github pages评论功能，叫gitment的东西,使用github账号登录然后参与评论，使用github提供的评论编辑器，这多么的方便，而且github评论编辑器十分强大，可以直接解析markdown，马上上手！

### gitment原理

gitment实际上就是利用github issues来实现一个评论功能的。因为你再github上创建一个仓库，然后人们可以在你的仓库提issues，这就相当于一个评论了。然后github开放了issues第三方调用的api，可以在你的网站通过调用github的api来写入或者获取对应仓库的issues，这不就是一个评论存取的过程吗？

### 创建评论组件

有些主题中会有一个comment.esj文件，这就是评论模块，但是对于我们的github pages来说，没有什么用处。所以我们在主题文件夹中_partial目录下创建一个githubIssues.ejs文件

然后加入以下代码

```html
	<div id="container"></div>
	<style>
	.gitment-header-issue-link,.gitment-footer-container{
		display:none;
	}
	</style>
	<link rel="stylesheet" href="https://imsun.github.io/gitment/style/default.css">
	<script src="https://imsun.github.io/gitment/dist/gitment.browser.js"></script>
	<script>
	var gitment = new Gitment({
	  id: '页面 ID', // 可选。默认为 location.href
	  owner: 'Kuohao-wu', // 你的github用户名
	  repo: 'githubPageComment', // 你放评论的仓库，就是说你需要开一个新的仓库来提供issues
	  // 以下是第三方调用githubapi接口认证，下面会说怎么获得
	  oauth: {
	    client_id: '***********',
	    client_secret: '***************************',
	  },
	})
	gitment.render('container')
</script>
```

### 新建github repository

新建一个github repository来为博客提供issues

### 获取github接口认证

打开 [github个人设置](https://github.com/settings/profile)

点击侧栏中的 **OAuth applications**,然后 `register a new application`

填入以下设置

``` shell
Application name  ## 随便填
Homepage URL  ## 你的hexo博客地址
application description  ## 随便填
Authorization callback URL  ## 你的hexo博客地址

```
 
 设置完成之后，github会给你提供client_id和client_secret，填入githubIssues.ejs中即可

 ### 在页面中引入githubIssues

 在主题文件夹下的layout目录中，找到post.ejs,这个就是文章详情的模板，找一个适合的位置插入即可。

 插入的格式为:

 ```javascript
 <%- partial('_partials/githubIssues')%>
 ```

 partial是hexo提供的一个方法，用于引入ejs模板组件

### 本地测试

`gs` 本地构建并测试

如果没有出现github issues编辑器，那就说明githubIssues.ejs没有正确引入;

如果出现了github issues编辑器，但是出现 `Error: not fount` 就说明你的ID写错的，ID应该出你的github用户名，一般是英文字母或者英文+数组

如果出现了comment is not initialization，那么说明你已经成功引入了github issues插件，只是评论还有没初始化

### 初始化评论

评论编辑器右上角点击login,此时会被提示需要登录github，你用自己的账号登录，之后便会在博客文章页面上，看到 **initialization** 按钮，点击它，出现 `no comment yet` ，那么评论功能就可以正常使用了





