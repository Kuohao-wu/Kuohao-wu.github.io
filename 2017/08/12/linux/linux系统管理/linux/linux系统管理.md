---
title: linux系统管理
tags: 系统管理
categories: linux
---

#### 查看所有的系统进程
`ps aux`    --BSD系统查看进程方法
`ps -le`    --标准linux查看进程方法


#### 查看系统健康状况
`top`

mac下交互模式为
- o + keyname  ['cpu','mem','pid',...] 按keyname对进程排序
- q 退出top模式


#### 杀死进程
`kill [sign] pid`      通过pid杀死一个进程,可选项为杀死信号
`killall [sign] proessName` 通过进程名杀死一类进程，可选项为杀死信号


#### 常用的杀死信号
![image_1bb59f4bk1aj9pj11ckfdga9bb9.png-188.3kB][1]


  [1]: http://static.zybuluo.com/kuo-hao/jzc5n8i4lme2jkuwi9ayxf9c/image_1bb59f4bk1aj9pj11ckfdga9bb9.png