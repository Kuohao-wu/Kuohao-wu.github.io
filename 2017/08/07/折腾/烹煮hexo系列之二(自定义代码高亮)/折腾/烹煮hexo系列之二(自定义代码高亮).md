---
title: hexo搭建个人技术博客之二(自定义代码高亮)
tags: hexo
categories: 折腾
---

### 材料

1. highlight.js
2. highlight.js配套样式
3. 耐心


### 为何需要自定义代码高亮

很多时候我们看中了某款hexo主题，但是感觉这个主题的代码高亮不甚合自己的审美，所以就有些许的惋惜和不甘。但是其实我们可以修改主题的代码高亮，highlight.js是一个代码高亮的js插件，其官网有 ** 176 languages and 79 styles ** ,还提供在线代码高亮预览，所谓各花入各眼，79种代码高亮配色，总有一款属于你的。
git

### step1. 停用主题的代码高亮
要自定义代码高亮，首先要停用hexo默认的代码高亮，打开hexo根目录下的_config.yml文件，找到以下配置

```shell
highlight:
  enable: true
  line_number: true
  auto_detect: true
```

然后把 enabel改成false,表示停用hexo默认的代码高亮，这样我们就可以添加我们自定义的代码高亮插件了

### step2. 使用CDN加速
在[highlight.js官网deom](https://highlightjs.org/static/demo/) 中挑选好你喜欢配色，如我决定我要用 **Solarized Dark**高亮配色，我们不使用highlight官网提供的在线链接，我们使用bootstrap中文网的开源CDN，这样国内打开的速度会快一点

打开 [bootstarp中文网开源CDN](http://www.bootcdn.cn/)，然后搜索highlight.js

找到highlight.js 插件 http://cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js
找到你要用的代码配色样式 http://cdn.bootcss.com/highlight.js/9.12.0/styles/solarized-dark.min.css

### step3. 添加插件
在你的hexo主题文件夹中，找到你使用的主题，上一篇文章讲了如何在_config.yml中更换主题，你可以在_config.yml中知道正在使用的是什么主题。
然后在主题文件夹中按照*layout->_partials*路径找到一个 **head.ejs**文件，打开它，你会看见很多 <%%>的符号，这就是js模板引擎的特点，如果有用过undersocre.js，artTemplate的小伙伴就知道了。

在以下配置下添加我们的插件

```javascript
	<link rel="icon shortcut" type="image/ico" href="<%= theme.head.favicon %>">
  <link rel="icon" sizes="192x192" href="<%= theme.head.high_res_favicon %>">
  <link rel="apple-touch-icon" href="<%= theme.head.apple_touch_icon %>">
  
  //... 以下代码为添加我们的插件
 
  <% if(theme.highlight_theme){ %>
 	 	<link href="//cdn.bootcss.com/highlight.js/9.12.0/styles/<%=theme.highlight_theme%>.min.css" rel="stylesheet">  
  <% } else { %>
    <link href="//cdn.bootcss.com/highlight.js/9.12.0/styles/default.min.css" rel="stylesheet">  
  <% } %>
  <script src="//cdn.bootcss.com/highlight.js/9.12.0/highlight.min.js"></script>
  <script>hljs.initHighlightingOnLoad()</script>
```

为了方便我们更换不同的颜色主题，我们可以在主题下的_config.yml配置我们要用的配色样式，然后再ejs文件中使用theme对象来访问对应的配置，ejs模板使用<%=text%>来解析变量输出，使用<%-html%>来解析html,区别就是innerText和innerHTML的区别，前者输出text文本，后者输出html。最后还需要使用hljs.initHightlightOnLoad()来初始化插件，这样插件才能生效。

因为开启关闭默认的代码高亮功能，会因为缓存而不能生效，所以我们需要使用 `hexo clean`来清除之前生成的静态页面， `gs` 构建并在本地预览

### 解决样式冲突
有时候结果并不如我们所愿的那样，最后代码高亮还会夹杂着其他一些颜色，甚至压根没有效果，首先你得排除插件有没有正常被引入的可能性，打开页面调试，在<head>标签中看看你的插件和样式有没有正常被引入。如果没有正常被引入，就重新看看上面的步骤有没有落下什么。如果是正常引入，就可能被主题的css样式覆盖了。
因为虽然关闭了hexo的默认代码高亮，但是主题也会有代码高亮样式。highlight.js的样式其实权重非常低，所以我们需要修改主题的代码高亮样式。

在你的主题文件夹下，页面的样式和js文件都在source中，根据调试工具找到覆盖highlight样式的css，再在source中找到对应的文件修改掉，然后 `gd` 构建部署就可以了，如果你想在本地先预览就使用 `gs`

### 后话
第一看hexo主题，有点找不着北，这些文件夹都有什么用，后面将出一节完全讲解hexo主题结构，主题文件作用，让你修改主题更轻松，更容易上手。






