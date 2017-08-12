---
title: javascript new 运算符
tags: 深入javascript
categories: javascript
---

> 以前常常用的new运算符，一new就出来一个对象，神奇的很，现在我们来看见这个new底层究竟干了些什么


#### 一、解析new运算

**new一个对象**

```javascript
	function Test(name,age){
		this.name = name;
		this.age = age
		this.method = function (){
			return this.name +':'+ this.age;
		}
	}
	var t1 = new Test('kuohao',21);
	t1.method();      //输出 'kuohao':21
```

使用了new这个运算符，t1就成为了一个对象，也拥有了Test构造函数的method方法，这个new方法究竟做了什么？

***
**实际上new方法的后台是这样的**

```javascript
	//var t1 = new Test('kuhao',21)
	//new Test 相当于以下代码
	
	function Test(name,age){
		//新建了一个对象,this指向了新建的当前对象
		var t1 = {};
		//让this的原型对象继承Test的原型对象属性和方法。
		t1.constructor.prototype = Test.prototype;
		//将传进来的参数赋给this的属性
		t1.name = name;
		t1.age = age
		t1.method = function (){
			return this.name +':'+this.age;
		};
		
		//最后返回出这个this对象
		return this;
	}
```



或者可以使用call方法去理解 new Test 构造

``` javascript
//后台新建一个对象
var obj = {};
//让对象实例的原型对象继承Test构造函数的原型属性和方法
obj.__proto__ = Test.prototype
//使用call方法把Test构造函数的实例属性和方法都拿过来为已所用，即是继承
Test.call(obj,'kuohao',21);

```

#### 总结
我的个人理解就是new运算符将构造函数实例化构造对象，事实上就是继承了构造函数的实例属性实例方法和原型属性和原型方法，初始化了对象，对象是JavaScript中预定义的，但是可以让我们去扩展它，实现更多的功能。



