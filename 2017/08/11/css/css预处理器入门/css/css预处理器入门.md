---
title: css预处理器入门
tags: css预处理
categories: css
---


### 到底应该选择哪个css预处理器呢

其实css预处理基本的功能less和scss都是差不多的，如果你之前没有了解过css预处理器，那我建议您两种都试试，哪个容易上手用哪个，那些文档上面介绍得很牛逼的功能，我们日常开发基本用不到。最常用的几个就是变量，嵌套，mixin混入，extend继承，其他自定义函数，条件判断，for循环，当然是有用，但是用到的几率比较小。本文不是照搬文档的水文，着重点是介绍css预处理器的基本用法，为什么要用预处理器，他们能为我们解决那些前端遇到的痛点，以及less和scss不异同。


### css预处理器的简介

#### 什么是css预处理器

css预处理就是通过编程语言赋予css特有语法，可以使用变量，函数，嵌套，混入等编程语言才有的特性，提高css的编写效率。

#### 有哪些css预处理器
css有三大预处理器，分别是 **scss(sass)**, **less**, **stylus**, scss是由sass发展而来，scss和sass的区别就是前者使用花括号表示一条css规则，后者使用缩进表示一条css规则。less和scss一样都是使用花括号，而sass和stylus一样，都是使用缩进。

sass一开始是由ruby写的，现在有了node-sass版本，less和stylus都是由nodejs写的，真是JavaScript一统天下。


### 学前准备

学习less和scss的基本语法，不需要安装less和scss编译器，网上就有在线编译器，可以练习less和scss语法

less

> https://lesstester.com/
> http://demo-iless.rhcloud.com/

scss

> [强大的scss在线编辑器，支持scss和sass] https://www.sassmeister.com/


### 变量

#### 什么是css变量？

大家在js中使用变量，就是一处定义，到处可用，那么scss变量也是这样。定义了一个变量之后，可以在多个地方用，一旦修改变量，所有被引用的变量也会跟着改变，不用我们一个一个修改，这就省事很多了。


#### scss变量和less变量的区别

```css
    /*变量声明*/
    @color: #f60;  /* less中命名变量的语法 */
    $color: #f60   /* scss中命名变量的语法 */    
    
    /*变量引用*/
    p{
        color: @color; /* less引用变量语法 */
        color: $color; /* scss引用变量语法 */
    }
    
```

两者并没有多大的区别，只是命名关键字不一样而已。顺便扯个蛋，原生css已经有变量了，但是就是因为less和scss占用了 `@ ` 和 `$` 两个关键字,原生css变量不得不使用 `--` 来命名变量。

想了解更多的同学，这里推荐阮一峰老师的 [css变量教程](http://www.ruanyifeng.com/blog/2017/05/css-variables.html)


#### css变量有哪些使用场景？####

比如说你的网站主题色为粉红色 pink,那么很可能，你的按钮要做成粉红色的，你的导航背景色要做成粉红色的，你的某个容器的border也是粉红色的，你就可以定义一个全局变量 `$themeColor: pink` ，这样即使你的老板说粉色太骚，要换个颜色，你只要随手改改这个主题颜色全局变量，其他引用了这个变量的样式也会跟着改变，轻松搞掂需求，这就是变量的好处。


#### less变量的特性

less变量有一个特性需要注意的，就是lazy loading，懒加载,即变量不必在使用前声明，你使用了再声明也可以，类似于js变量命名提升，但不同的是less是语句提升，把所有变量赋值操作提升至变量所在的作用域顶部，这是less的特性，scss这样做是会报错的。

```css
    p{
        color: @color;
    }
    @color: green;
```

这样也能编译成

```css
   p{
        color: green;
   } 
```

但其实这是一个坏习惯，官网还弄了一个很绕的例子出来说明这个特性，搞得像js作用域一样理解less作用域，我觉得是一个很扯的东西。变量应该在使用前声明，这是编程的好习惯。


### 嵌套

#### 嵌套的使用场景

如果项目稍微大一点，要写的css都是巨量的，很多时候，写样式为了提高优先级，不容易被后面覆盖，都会在选择器前面加两三个类,写完一个css规则，复制一份类，再写下一个规则，忒累人。

```css
    header .topBar .leftCotent{
        /* some css */
    }
    header .topBar .leftContent .icon{
        /* some css rules */
    }
```
嵌套选择器，可以让你按照选择器的父子关系进行嵌套，这样可以一层一层地嵌套着写，结构层次分明，而且不用人工去复制那些相同的类名，大大提高效率。


#### 嵌套怎么用？

嵌套的用法也很简单，就是按父子关系一个规则套一个规则

```css
    header .topBar {
        .leftCotent{
            width: 50%;
            .icon{
                display: inline-block;
                width: 50px;
                height: 50px;
                vertical-align: middle;
            }
        }
    }
```

这样既省心又舒心，但是嵌套最多不要超过三层，超过三层，就会让css冗余且造成浏览器解析性能下降。

#### 父选择器

在嵌套中，有一个父选择器大家也是需要搞懂的。

```css
    /*传统的方式给这个按钮加上 hover样式*/
    .submit:hover{
        background: #eee;
    }
    .submit{
        display:inline-block；
        background: #f60;
        border-radius: 3px;
    }

    /*在less和scss中你可以这样写*/
    .sumit{
        &:hover{
            background: #eee;
        }
        display:inline-block;
        background: #f60;
        border-radius: 3px;
    }
```

用scss和less编译之后能得到和传统一模一样的写法，但是就是省事不少，这就是预编译器的威力。

#### 作用域

嵌套中的每一个花括号就是一个作用域，俗称块作用域，作用域特性和js一样。子作用域可以引用父作用域的变量，但是父作用域不能访问子作用域的变量。

```css
    div{
        /*声明一个变量$height*/
        $height: 100px;

        width: $width;
        height: $height;
        line-height: $height;
        p{
            /*声明一个变量$width*/
            $width: 100px;

            height: $height;
            width: $width;
        }
    }
```

因为div为p的父级，div引用了一个$width变量，div所在的作用域内找不到$width的变量，他不能在子级的作用域中查找,所以报了个错，`Undefined variable: "$width"`  ，如果把div的 `width：$width` 去掉，则能够编译成功，因为p子级能够引用父级作用域内定义的变量。



如果子级的作用域和父级的作用域的有相同命名的变量，则按照就近原则，优先用有本作用域内的变量。

```css
    div{
        /*声明一个变量$height*/
        $height: 200px;

        height: $height;
        line-height: $height;
        p{
            /*同样声明一个变量$height*/
            $height: 100px;
            height: $height;
            line-height: $height;
        }
    }
```

编译的结果为

```css
    div{

        height: 200px;
        line-height: 200px;
        p{
            height: 100px;
            line-height: 100px;
        }
    }
```



#### less嵌套和scss嵌套用法的区别

两者没有区别


### mixin混入

混入其实和变量差不多，一处声明，随处可用。

#### 什么是混入

程序员就有一个毛病，不自觉地想着如何把公共部分抽出来复用。很多时候，我们会做一些不断重复的工作。js函数可以复用，那么css如何复用？

实际上，没有css预处理器之前，css就已经得到复用了。比如像bootstrap那样，把所有的button的基础样式都写在一个btn的类中，我们只要在button标签中加一个btn的样式就可以得到一个看着还不错的button按钮，这就是boostrap给btn定义了样式。

但是这种方式也有个问题，就是css和html耦合程度比较高，css类名不语义化。我们写个样式需要在div上面挂一堆类，难以管理，而且修改的时候不但要改css，还要改html，这对于日益繁杂的前端开发来说，实在是不合时宜。

所以css预处理一出来，就有新的开发方式了。我们可以把常用的一些代码片段提取出来，然后通过混入的方式，将公共代码加入到需要的类中。

```css
    /* 把一段非常通用的样式提取出来，定义成mixin */
    /*scss混入*/
    @mixin btn{
        display:inline-block;
        border:none;
        border-radius: 3px;
        background: #eee;
        padding: 4px 8px;
    }
    // 一个网站常常会有很多按钮，它们有共性，也有个性
    .submit {
        /*共性*/
        @include btn;
        background: blue;
        width: 100px;
        height: 25px;
    }
    .verify{
        /*共性*/
        @include btn;
        /*个性*/
        background: green;
    }
```

当我们使用scss或者less编译工具编译之后，就会变成这样

```css
    .submit {
        display:inline-block;
        border:none;
        border-radius: 3px;
        background: #eee;
        padding: 4px 8px;
        background: blue;
        width: 100px;
        height: 25px;
    }
    .verify{
        display:inline-block;
        border:none;
        border-radius: 3px;
        background: #eee;
        padding: 4px 8px;
        background: green;
    }
```

那这样还不如挂一堆类方便快捷，代码量还小。挂类的方法牺牲了维护性，提高了效率，减少了代码，但是当项目大了之后，这种方法往往会让你维护起来花费更多的时间。css预处理器把就让css类名更语义化，为前端多类症提高了一个治疗方法，让css管理起来更加得心应手，也是现在css预处理流行的原因。

#### less混入和scss混入的区别

```css
    /*scss混入*/
    @mixin btn{
        display:inline-block;
        border:none;
        border-radius: 3px;
        background: #eee;
        padding: 4px 8px;
    }
    /*less 混入*/
    .btn(){
        display:inline-block;
        border:none;
        border-radius: 3px;
        background: #eee;
        padding: 4px 8px;
    }
    
    /*混入的引用*/
    
    .test {
        /*scss混入的引用*/
        @include btn;
        /*less混入的引用*/
        .btn()
    }
```

scss的@mixin定义的混入是不会编译输出到css中的，而less定义的mixin，需要在类名后面加一个()才不会编译输出，否则会被当做一个普通的css规则。

#### 带参数的混入

其实混入就相当于一个函数，能够传参，能够调用。

```css
    @mixin btn($bg,$width,$bdrs) {
        display: inline-block;
        border-radius: $bdrs;
        background: $bg;
        width: $width;
        padding: 4px 8px;
    }
```

混入传参还可以设置默认值

```css
    @mixin btn($bg:#f60,$width:80px,$bdrs) {
        display: inline-block;
        border-radius: $bdrs;
        background: $bg;
        width: $width;
        padding: 4px 8px;
    }
```

调用的时候，就像普通的函数一样使用

```css
    .warn {
        @include btn(#f60,80px,2px)
    }
```

设置参数less和scss的区别就是把变量中的$换成@，传参的格式是一样的，和less不同，如果mixin中没有参数，scss的mixin是可以把()省略的。


### extend继承

其实extend继承就是我们常见的选择器分组，把拥有相同样式的选择器写在一起，从而节省代码量

#### extend使用场景
```css
    /*我们非常常用的清除浮动代码*/
    .clearfix::before{
        content: '',
        display: table;
        clear: botn;
        height: 0;
    }
    
    .floatBoxA{
        @extend .clearfix;
    }
    .floatBoxB{
        @extend .clearfix
    }
```

编译输出之后会得到

```css
    .clearfix::before{
        content: '',
        display: table;
        clear: botn;
        height: 0;
    }
    
    .floatBoxA, .floatBoxB{
        content: '',
        display: table;
        clear: botn;
        height: 0;
    }
```

这就是我们平时css中常用的选择器分组。之所以叫继承，是这样理解的： 

> .floatBoxA和.floatBoxB 继承了.clearfix::before的样式，获得了它的全部代码。

但是有一个问题，.clearfix::before的样式还是编译输出到了css中啊，我不想要怎办。scss有一个解决办法，就是 **%placeholder**

#### %placeholder的使用场景

像一些编译出来完全没有用的样式，我们就不必把它编译出来了

```css
    %clearfix::before{
        content: '',
        display: table;
        clear: botn;
        height: 0;
    }
    
    .floatBoxA{
        @extend .clearfix;
    }
    .floatBoxB{
        @extend .clearfix
    }
```

编译输出为

```css
    .floatBoxA, .floatBoxB{
        content: '',
        display: table;
        clear: botn;
        height: 0;
    }
```

.clearfix::before的样式不见了，这样就为我们节省了一点不必要的代码。


#### less extend 和 scss extend的区别

```css
    /* less extend */
    .a{
        color: #fff;
    }
    .b {
       &:extend(.a);
       font-size: 16px;
    }
    /*或者可以这样*/
    .b:extend(.a){
        font-size: 16px;
    }    

    /* scss extend */ 
    .a {
        color: #fff;
    }
    .b {
        @extend .a;
        font-size: 16px;
    }
```

两者的区别就是写法的略有不同，less比较麻烦一点。

### 插值

#### 插值使用场景
插值是什么？ 先来看一段代码

```css
    .trangle{
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-bottom: 10px solid #000;
    }
```

这是大家都很常用的小三角形，那我现在想控制它不同的方向怎么办？因为在网站中有不同方向的小三角形太常见了。

在scss中可以这样做

```css
    /*使用我们的mixin，默认方向倒三角,默认三角形颜色为黑色*/
    @mixin trangle($direction:top,$color:#000){
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-#{$direction}: 10px solid $color;
    }
    
    /* 灵活引用 */
    .topTrangle{
        @include trangle(bottom,#f60)
    }
    .leftTrangle{
        @include trangle(left, green)
    }
```

scss中插值使用#{}把变量进行包裹，我们的属性才需要插值,我们的属性值则直接使用变量就好了。border为属性，1px solid #000这些为属性值。插值解决的就是这些有方位的属性。

#### less中插值和scss中插值的区别

```css
    /* scss */
    $direction: left;
    p{
        border-#{$direction}: 1px solid #000;
    }
    
    /* less */
    @direction: left;
    p{
        border-@{direction}: 1px solid #000;
    }
```

两者没多大区别，就是写法less会较简洁一点。


### 文件导入

#### 文件导入语法

scss和less文件导入都是使用 @import,这和原生的文件导入语法是一样。如果是导入less/scss文件，则不用加less/scss后缀，导入原生css则需要加一个 `.css` 的后缀。

#### 分音/引用

有时候，我们会使用一些less/scss写的样式库，比如boostrap，如果我们使用@import导入的话，会把里面的样式全部编译到我们的css里面，我们想要的，我们用到的样式到编译到我们的css里面。那么分音/引用就有用了。

这种功能的实现，scss叫分音(Partials)，less叫引用(reference)

在scss中，分音是根据区分文件来实现的，即如果scss文件中存在以 `_` 开头的，如 `_bootstrap.scss`，导入样式编译的时候，只会编译那些被引用的样式，没有被引用的不会编译到我们的css中。

```css
/* 把boostrap.scss重命名成_bootstarp.scss, 但是在import的不需要加 _ */
@import 'bootstrap';
```


而less中则使用import options使用参数去实现

```css
/* 加一个reference参数即可 */ 
@import (reference) "foo.less";
```

#### 文件的划分与组织
讲到文件导入，就涉及less/scss文件的组织。一般不太大的项目可以这样分:

```markdown
style
    --- base
            --- normalize.css     /* 统一浏览器样式 */
            --- reset.css         /* 按需重置浏览器样式 */
    --- scss
            --- _mixin.scss       /* 混入函数 */
            --- _variable.scss    /* 全局变量 */     
            --- components.scss   /* 基础组件样式 */
            --- layout.scss        /* 页面主样式 */
```

文件的划分和布局展开讲篇幅太多，更多的讨论请看
[你是如何去组织项目中的 Less/Sass 代码的？](https://www.zhihu.com/question/35708352)

文件划分和组织需要用到本地编译器，我推荐新手使用 koala，一款国人开发的编译器，支持，less/scss等编译
[koala官网](http://koala-app.com/index-zh.html)
[koala使用教程](http://blog.csdn.net/u011250873/article/details/45917519)

### mixin与extend之争

mixin和extend好像都差不多，到底是用mixin还是extend呢？ 

**extend**

优点：
    > 1. 能够最大程度地复用代码，减少冗余代码
    
缺点：
    > 1. 不能传参，功能实现有限
    > 2. 把多个选择器绑在一起，增加了耦合性，维护困难

**mixin**

优点：
    > 1. 能够传参当函数使用
    > 2. 一个萝卜一个坑，混入的代码片段是独立的，易于维护
    
缺点：
    > 1. 不可避免地使css冗余增多，增大样式表文件
    
    
不过现在gzip压缩算法(服务器压缩，浏览器端解压)对于重复片段优化得很好，能明显减少传输时css的文件体积，而且css文件是可以缓存的，用户体验不会太受影响。所以extend的优势几乎可以忽略了。

但是extend并非可以用mixin完全取代。一些比较固定，不会随意修改的片段可以使用extned，比如清除浮动代码片段，文字溢出隐藏片段，宽高不确定的div的垂直居中片段，移动端1px border片段等等，这些都是一些常用且很少修改的片段，就可以使用extend，能优化则尽量优化。


### 结语

经过以上介绍大家可以看到，其实less和scss的基本用法都是差不多的，与其纠结到底学哪个，还不如花个半小时都去试试，哪个顺手用哪个。而且决定你要用哪种的不单单是你自己，更重要的是你的团队。其实css预处理,无论是less/scss/stylus常用的就上面列举的几种功能，只要掌握了他们基本的，共同的套路，无论你的团队决定用哪种css预处理器，你只要花几分钟看看文档，马上就能用起来，真正做到 **手中无剑，心中有剑**，本文的初衷就大抵如此了。

--- 

参考文档
> [scss中文文档](https://www.sass.hk/docs/) https://www.sass.hk/docs/
> [less中文文档](http://www.css88.com/doc/less/features/#) http://www.css88.com/doc/less/features/#
> [Sass:@mixin和@extend该如何选择_CSS处理器](http://www.w3cplus.com/preprocessor/sass-mixin-or-extend.html)     http://www.w3cplus.com/preprocessor/sass-mixin-or-extend.html