---
title: 探究javascript {} 的二义性
tags: 深入javascript
categories: javascript
---

> 今日学习解析json字符串，用到了一个eval()方法，解析字符串的时候为什么需要加上括号呢？摸不着头脑。原来javascript中{}语句块具有二义性，不加括号会出错，理解这种二义性对我们理解javascript代码有极大帮助。




### {}语句块的两个含义

#### 一. 表示语句块

1. 在javascript中可以使用{}来括起代码，在编辑器中方便管理代码。因为javascript并没有块级作用域，所以这种写法是无害的。

```javascript
{
	//some code...
}
```

2. 在javascript中 ，条件判断语句，循环语句，函数都需要{}语句块来整合代码


#### 二. 对象字面量

```javascript
var box = {
	name:'kuoaho',
	age:21	
}
//此时{code}作为表达式，可以赋值给一个变量
//其实对象字面量就是可以生成对象值的表达式
```

#### 二、那如果对象字面量不作为一个赋值表达式，会发生什么情况呢？

```javascript
	{name:'kuoao'}        //没有报错，但是也没有创建对象
	{name:'kuohao',age}   //报错
```
由上面可以看出对象字面量只能够作为表达式赋值，第一种写法没有错，只是javascript将它作为一个label语句解析了。

``` javascript
	{name:'kuoao'}

	   //{}一个语句块
	  // name:'kuohao'，一个label语句，用于标记for循环
```

### 三、但是问题又来了……

```javascript
{
name:'kuohao',
age:21
}
//这样为什么会报错？这不是对象字面量的写法吗？
```

因为javascript中{}的二义性，{}不仅仅被认为是对象字面量而且还会被认为是代码块。

```javascript
	{
	name:'kuohao',
	age:21
	}
	    
```

一个代码块，两条label语句，如果没有逗号，是完全没有问题的，所以关键在于逗号，语句的分隔应该使用分号，所以javascript会判定这是语法错误

### 四、正确的写法

```javascript 
({
	name:'kuohao',
	age:21
	})

    //正确的写法
```

()会把语句转换成表达式，称为语句表达式，对象字面量不是表达式吗？为什么还需要()来转换？

> 加上括号以后，就可以消除这种二义性，因为括号里的代码都会被转换为表达式求值并且返回，因此语句块也就变成了对象字面量，也可以得出，对象字面量必须作为表达式而存在


>参考资料：
>[JavaScript中:表达式和语句的区别[译]_javascript技巧_脚本之家](http://www.jb51.net/article/31298.htm)
>[CJ-JavaScript教程](http://www.ycku.com/cjjavascript/)

