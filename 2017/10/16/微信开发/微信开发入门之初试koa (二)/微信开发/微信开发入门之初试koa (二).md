---
title: 微信开发入门之初试koa(二)
tags: koa
categories: 微信开发
---

### 为啥要选择koa2

这次我们使用最新的koa2.3框架进行微信后台的开发，koa2使用了async，await来进行处理异步事件，相比koa的generater来得更简洁和语义化一些，而且应该也会是未来的node后台主流框架，所以我们就尝尝鲜，一起快速入门koa2


### 快速搭建一个http服务器

koa2搭建一个简单的web服务器只需要四行代码

``` javascript
    cosnt Koa = require('koa')
    const app = new Koa()
    app.use(async ctx => {
        ctx.body = 'hello world'
    })
    app.listen(8080)
```

首先先开启natapp服务器，再运行这个脚本 `node app`，在浏览器打开 `http://kuohao.natapp1.cc/`,就可以看到 **hello world**

### 路由

在express框架中，路由是集成在框架中的
```javascript
    // express
    const express = require('express')
    const app = new express()
    app.get('/', function(res,req){
        res.send('hello world')
    })
    app.listen(8080)
```

但是koa就将路由分离出来，由用户自行添加

```javascript
    // koa
    const Koa = require('koa')
    const app = new Koa()
    const route = require('koa-route')
    
    // 作为一个中间件使用
    const home = route.get('/', ctx => {
        res.body = 'hello world'
    })
    // 使用中间件
    app.use(home)
```

### 完整的客户端请求和服务端响应示例

```javascript
    // 成绩数据
    const data = [
        {
            name: 'kuohao',
            age: 22,
            grade: 80
        },
        {
            name: 'lily',
            age: 20,
            grade: 90
        },
        {
            name: 'wang',
            age: 23,
            grade: 70
        } 
    ]
    
    const homePage = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Document</title>
        </head>
        <body>
          <h1>学生成绩查询系统</h1>
          <form action="/grade">
            <input name="name" type="text" placeholder="请输入学生姓名"/>
            <button>查询</button>
          </form>
        </body>
        </html>
      `
    
    // home路由,返回主页HTML
    const home = route.get('/', ctx => {
      ctx.body = homePage
    })
    
    // checkGrade路由
    const checkGrade = route.get('/grade', ctx => {
      const name = ctx.query.name
      const result = data.find(item => (item.name === name))
      const respon = result => {
          let content = ''
          if(result) {
              content  = `
                <p>${result.name}的成绩为${result.grade}</p>
                <a href="/">返回</a>
              `
          } else {
              content = `
               <p>您查询的学生不存在</p>
               <a href="/">返回</a>
              `
          }
          return content
      }
      // 返回响应数据
      ctx.type = 'html'
      ctx.body = respon(result)
    })
    app.use(home)
    app.use(checkGrade)
```

### 疑点解析
#### context 
koa2和koa不同之处就是koa2使用async,await代替了generater处理异步事件，Koa Context 将 node 的 request 和 response 对象封装在一个单独的对象里面，其为编写 web 应用和 API 提供了很多有用的方法。

```javascript
    // koa
    app.use(funciton*(){
        this    // is the context
        this.response   // response
        this.request    // request
    })
    
    // koa2,需要显示传递context
    app.use( ctx => {
        ctx     // is the context
        ctx.response    // response
        ctx.request     // request
    } )
```

#### ctx.body 和 ctx.response.body

许多 context 的访问器和方法为了便于访问和调用，简单的委托给他们的 ctx.request 和 ctx.response 所对应的等价方法， 比如说 ctx.type 和 ctx.length 代理了 response 对象中对应的方法，ctx.path 和 ctx.method 代理了 request 对象中对应的方法。


### 深入理解koa需要看的文章

1. [Koa 框架教程](http://www.ruanyifeng.com/blog/2017/08/koa.html)
2. [Koa 2入门](https://cnodejs.org/topic/5709959abc564eaf3c6a48c8)

3. [koa中间件机制详解](https://cnodejs.org/topic/58fd8ec7523b9d0956dad945)







