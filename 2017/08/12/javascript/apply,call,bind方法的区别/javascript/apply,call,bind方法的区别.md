---
title: apply,call,bind方法的区别
tags: this
categories: javascript 
---

#### apply,call的区别
apply,call方法是Function类的原型方法，作用是改变函数的执行上下文
apply可以传递一个数组作为参数，而call只能一个一个参数进行传递

#### bind和apply，call方法的区别
bind方法是改变函数执行上下文的函数，返回该函数
apply,call方法的作用是改变函数执行上下文，并马上执行

#### bind和call传参顺序的区别
bind方法传参的时候，会保留回调函数的默认传参，先新后旧，而call方法是先旧后新
