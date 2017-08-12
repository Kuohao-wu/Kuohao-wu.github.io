---
title: promise解惑
tags: promise
categories: javascript
---


### promise 的由来
有时候我们做ajax请求，可能会遇到以下这种情况
`requsetA > requsetB > requestC`
requestB的请求依赖requestA的数据，requestC的请求依赖requestB的数据。在没有异步编程的概念那时，我们往往只能通过回调函数的方法去解决这个问题。

```javascript
     requestA(function(res){
            requestB(function(res){
                  requestC(function(res){
                        //do something
                  })
            })
      })
```

其实也不是很难看，比较有层次感，哈哈。。。

**然而**，实际情况并不会想现在那样那么简单，你可能还需要将requestA的数据进行一些处理才能够传给requestB，requestB请求回来的数据，又得做一些处理才能传给requestC，那么这就会变成一团巨大的函数体，可读性十分糟糕。

所以就有了promise对象的出现，它是专治多重依赖的异步操作的。

我们可以使用promise来改写以上代码

### promise走起

```javascript
//定义 一个promise对象，进行requestA异步请求
  let pro = new Promise((resolve,reject)=>{
       requestA({//一些配置})
       //jquery 1.8+ 新写法，success已经过时
      .done((data)=>{
          //resolve方法将参数传递给下一个回调函数
          resolve(data)  
      })
      .error((err)=>{
          reject(err);  
      })
  })

 //进行requestB异步请求
let requestB = (res)=>{
    let pro1 = new Promise((resolve,reject)=>{
      reqb({//一些配置})
      .done((data)=>{
            console.log(res);
            resolve(data);
      })
      .error((err)=>{
          reject(err);  
      })
  })

 //进行requestC异步请求
let requestC = (res)=>{
    let pro2 = new Promise((resolve,reject)=>{
      reqc({//一些配置})
      .done((data)=>{
            console.log(res);
            console.log(data);
      })
      .error((err)=>{
          reject(err);  
      })
  })

//然后 ,使用优雅的方式进行异步回调

pro.then(requestB)
   .then(requestC)

```


### promise与传统的ajxa同步请求

让我们先来做一个实验

1. 写段简单的服务端代码，以php为例

```php
   <?php
      //睡眠5秒，模拟真实网络请求环境
       sleep(5);
      //防止跨域请求
       header('Access-Control-Allow-Origin:*');
       header('Access-Control-Allow-Methods:POST,GET');
        //获取前端get请求参数，返回
       $usript = $_GET['keyword'];
       echo $usript;
   ?>
```

2. 封装原生ajax请求
```javascript
//使用 ES6赋值解构语法
 function ajax({url,test,bool,callback}){
			var ajax = new XMLHttpRequest();
			ajax.onreadystatechange = function() {
				if (ajax.readyState == 4 && ajax.status == 200) {
					var response = ajax.responseText;
					Object.prototype.toString.call(callback) === '[object Function]' && callback(response)
					test && console.timeEnd(test)
				}
			};
			ajax.open("GET", url, bool);
			ajax.setRequestHeader("Content-type", "text/plain");
			ajax.send();
		}
```

3. 编写同步测试代码
```javascript
//使用chrome控制台api 的console.time()进行计时操作
ajax({
			url:"http://192.168.1.105/index.php?keyword=123",
			bool:false,
			callback:(res)=>{
				ajax({
					url:"http://192.168.1.105/index.php?keyword=123",
					test:'sync test',
					bool:false,
					callback:(data) => console.log(`${res} -requestA: ${data}`)
				})
			}
		})
console.log('hello promise')
```

结果

```javascript
123
test.html:15 sync test: 10014.349ms
hello promise
```

**结果显而易见ajax同步请求会阻塞javascript运行，导致其后的代码阻塞等待，严重拖低性能**


4. 编写异步测试代码

```javascript
   console.time('async test')
		let pro = new Promise((resolve,reject)=>{
			ajax({
				url:"http://192.168.1.105/index.php?keyword=123",
				bool:true,
				callback:(data)=>{
					if(data){
						resolve(data);
					}else{
						reject('请求错误！')
					}
				}
			})
		})

		let requestA = (res)=>{
			let resA = new Promise((resolve,reject)=>{
			ajax({
				url:"http://192.168.1.105/index.php?keyword=123",
				bool:true,
				callback:(data)=>{
					if(data){
						console.log(`${res} -requestA: ${data}`)
					}else{
						reject('请求错误！')
					}
				},
				test:'async test'
			})
		})
	}
	pro.then(requestA);

	console.log('hello promise')
```

**结果**

```javascsirpt
hello promise
test.html:62 123 -requestA: 123
test.html:15 async test: 10022.117ms
```
**promise是异步的，引擎执行代码的时候会先将异步代码挂起，先去执行其他代码，等待上一个请求结束再回过头来执行下一个请求的代码，所以，虽然promise和ajax同步请求用的时间一样多，也可以说promise就是在做同步请求，但是promise本身是异步的，并不会阻塞代码，所以你可以看到先打印出了hello promise**