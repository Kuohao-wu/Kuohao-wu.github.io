---
title: javascript基于原型链的继承
tags: 原型链
categories: javascript
---


> 最近在学习Javascript的面向对象，被constructor,prototype和\__proto\__搞到头大，但还好，磕磕绊碰碰，终于了解了一点原型继承。接下来我们来看看这个原型继承是怎么回事


#### 一、关于原型的几个概念

1. prototype属性
2. __proto__属性
3. constructor属性

他们直观的关系是：	

```markdown
function/
　　　　|——prototype/
	　　　　　　　　　　|—— constructor
	　　　　　　　　　　|—— __proto__
```

##### prototype属性
任何一个函数都存在着这样的一个prototype属性,这个属性是一个对象，称为原型对象。这个原型对象里有自函数一创建就生成的两个属性一个是constructor和 __proto__,除此之外我们可以给这个对象添加属性和方法，就像给一个普通对象动态添加属性和方法那样

```javascript

	//创建基类(或叫超类或叫父类)
	function Person(){};
	Person.prototype.name = 'kuohao';
	Person.prototype.age = 21;
	Person.prototype.method = function (){
		return this.name +':'+ this.age;
	}
	//给Person构造函数的原型对象添加一些属性和方法
	//（为什么说它是构造函数呢，因为需要用来构造对象，实际上跟普通函数一样）
```	
**现在原型对象就多了两个属性和一个方法**

```markdown
Person/
　　　　|——prototype
	　　　　　　　　　　|—— constructor
	　　　　　　　　　　|—— __proto__
	　　　　　　　　　　|——name:'kuhao'
	　　　　　　　　　　|——age:21
	　　　　　　　　　　|——method:function（）｛
			　　　　　　　　　　return……
			　　　　　　　　　　｝
```

**这个原型对象有啥用？？？**
请看——

```JavaScript
//实例化
var guy1 = new Person();
var guy2 = new Person();

console.log(guy1.name);    //'kuohao'
console.log(guy2.name);    //'kuohao'  

guy1.method()    //'kuohao':21
guy2.method()    //'kuohao':21
```

**我们没有给他们定义属性和方法，他们继承了Person构造函数原型对象里面的属性和方法，注意我们也没给Person构造函数定义属性和方法噢**

咋一看，跟构造函数和工厂模式差不多，他们都生成拥有相同属性和方法的对象。但是原型对象生成的对象有一个很重要的特点就是他们共用一个原型对象的属性和方法。

**为什么这么说呢？**
使用布尔运算来验证一下就知道了

```JavaScript
guy1.method()===guy2.method;	//true

```

如果是构造函数生成的对象，他们的方法都不相等，原因就是构造函数生成的对象有不同的引用的地址，而构造函数的原型继承方法生成的对象指向了同一个引用地址，他们的对象都使用这个引用地址的属性和方法，所以他们的方法是相等的，对于生成的对象的new方法，在另外一篇文章会讲到。


##### __proto__属性
这是相当重要的一个属性，但是它不是标准属性，在标准中，它是不对外开放的，当时chrome和Firefox的私有属性中对外暴露了它，使得我们可以比较清楚了了解原型继承的过程。


[__proto__](http://upload-images.jianshu.io/upload_images/1577855-725ea171e492a27f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

__proto__这个属性可以让我们访问创建当前对象的构造函数的prototype原型对象。那么当我们调用guy1.method()方法的时候，其实是这样的：

1. 当js解析器解析guy1.method()的时候，先看看guy1对象实例里有没有method这个方法
js解析器问："喂，哥们，你的method方法呢?"
guy1说："这个方法是我老爸的，不在我这里"
js解析器问：“怎么找到你老爸？”
guy1指着__proto__说：“这里有道门，你进去就可以找到他了”

2.然后js解析器就又跑去找他老豆，找到他老豆后
问：“喂喂，你儿子叫我来找method方法，在哪？”
guy1的老豆Person就拿出一个箱子（prototype），说：“method方法就在里面，你拿去吧！”

如果Person父类还是没找到method方法的话，实际上它的prototype对象也有一个\__proto\__属性，可以访问guy1的爷爷类的prototype对象，找到method方法。

所以，这个查找是一环接一环的，就像递归一样。

![原型链，图片来自慕课网].PNG](http://upload-images.jianshu.io/upload_images/1577855-21c757167154f75a.PNG?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



##### constructor属性
constructor属性指向的是创建此对象的构造函数的引用，这个属性存在prototype原型对象中，构造函数的对象实例也可以通过constructor属性来访问构造它的那个函数。

![构造与原型](http://upload-images.jianshu.io/upload_images/1577855-c8f351fdf047bb9c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
这个属性对于原型继承的实现来说，不是很重要。


#### 二、原型继承的实现
```javascript
	//父类
	function Person(){};
	Person.prototype.method = function (){
		return 'hello';
	}

	//子类
	function Child(){};
	Child.prototype = Object.create(Person.prototype);
	Child.prototype.constructor = Child;
	Child.prototype.say = function (){
		return 'hello world';
	}
	
	var c1 = new Child();
	c1.method();    //'hello'
	c1.say();       //'hello world'
	//由此可见子类继承了父类的方法，也拥有自己的方法
```

##### Object.create()方法
Object.create()方法是ES5的一个用来创建一个指定原型和若干指定属性的对象的方法。
定义来自 [Mozilla开发者文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

` Child.prototype = Object.create(Person.prototye);`
这句话的含义就是创建一个以Person原型对象为原型的空对象，赋值给Child的prototype原型对象.

`Object.create(Person.prototye)` ,相当与创建了这样一个对象：

```javascript
{
	constructor
	//指向Person构造函数，这就是为什么上面要把这个属性指回Child的原因
	__proto__
	//指向Person.prototype，上面说到原型链继承正是通过这个属性层层查找实现的
}
```
将这个对象去覆盖Child子类的prototype，这就成功与Person父类搭上了关系再此之前，Person与Child没任何关系。


但是Object.create()这个方法是新方法，低级的浏览器，如IE9以下不支持，需要做一下兼容处理

```javascript	
		function createObejct(o){
			if(!Object.create){
				//新建一个构造函数，用来做临时对象
				function a(){};
				//把原型对象参数赋给这个空对象的原型对象
				a.prototype = o;
				return new a();
				//实例化一个出来一个原型对象指向原型对象参数的空对象，返回给上下文
			}else{
				return Object.create(o);
				//直接使用
			}
		}
```






##### Object.create的一些替代方法

1. 直接将Person.prototype赋值给Child.prototype


`Child.prototype = Person.prototype  `

这样Person和Child就共用一个原型对象，他们的属性和方法都是一样的，但是这个就有问题了，如果Child类想扩展自己的属性和方法，那么Person类也会受到影响。

这里要注意的是赋一个原型对象为Person.prototype的空对象（上面的方法）跟赋一个Person.prototype是不一样的。

前者Child.prototype指向空对象的引用再由空对象中的\__proto__\指向Person.prototype，后者Child.prototype直接指向Person.prototype引用，后续的修改在都Person.prototype上,因为他们共用一个原型对象。

![前者](http://upload-images.jianshu.io/upload_images/1577855-3c94194bc88d1dc6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


![后者](http://upload-images.jianshu.io/upload_images/1577855-fd47140de19482c3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)




所以这个方法是非常不可取的，跟面向对象的多态特性相悖

2.new 一个Person的对象实例赋给Child的原型对象

`Child.prototype = new Person()`

这貌似是一个不错的方法，但是它也有弊端，就是事实上我们常常不会使用一个空的构造函数，来实例化对象，我们往往会将构造函数继承和原型继承结合在一起，所以我们的构造函数往往会有一些实例属性和实例方法，如果new Person()出来一个实例对象，对象里面还夹带着一些实例属性和方法，这看起来非常怪，虽然也是一个指向Person.prototype的对象。所以这种方法也不推荐使用，应该使用 ***Object.create()*** 较为妥当.




#### 总结：
我个人觉得实现原型继承最重要就是两个属性的理解，prototype原型对象和\__proto\__这个接口的概念的理解，再结合原型链层层查找这种继承方式的直观感知，就能比较好地掌握原型式继承。我也是这两天才理解的原型链式继承，如果有所缪误，请批评指正！




