---
title: git入门教程
tags: git
categories: git
---

#### git配置
本地配置，用于识别用户，管理仓库
`git config --global user.name xxx`
`git cofnig --global user.email xxx@xxx.com`

设置之后就可以创建git仓库了

#### 创建git仓库
使用`git init`命令，即可创建一个git仓库。


#### 提交修改到缓存区
使用`git add file`命令即可提交修改过文件到缓存区

#### 提交版本到git仓库
使用 `git commit -m "description"`即可提交版本到git仓库， -m参数后面跟着的是版本描述

> 如果提交的时候出现如下提示

`warning: LF will be replaced by CRLF`
这是因为windows中的换行符为CRLF，而Linux下的换行符为LF，所以在执行add的时候会出现以上警。

>解决办法

```shell
git config --global core.autocrlf false
```

#### 版本回滚
在git中使用**HEAD**代表版本号
使用 `git reset --hard HEAD^`即可回滚到当前版本的上一个版本
`HEAD^^`就回滚到上上个版本。

如果要回滚到指定的版本，那需要使用`git log`命令，先看看提交时的版本描述和commitID，然后再根据版本号提交
`git reset --hard 2df234`(只需要输入前几位git就可以自动搜索匹配了)


#### 提交代码到远程仓库
* 首先在github上新建一个仓库

* 然后使用git命令连接到远程仓库

```shell
git remote add origin git@github.com:Kuohao-wu/mytest.git
```
```shell
git push -u origin master
```

* 输入用户名和密码

#### 更新本地代码
如果需要提交代码到远程仓库，得要先从远程仓库上把代码拉取下拉，以免覆盖掉远程仓库的代码

使用`git pull`


#### 几个add命令的用法

```shell
    git add -A  #添加所有改动，包括新建，删除，修改
    git add *   #添加所有改动，但不包括删除
    git add -u  #添加删除和修改，但不包括新建文件
    git add ./   #添加所有文件
```
![image_1bch0qu121qq72e615uf1lt17av9.png-46.6kB][1]


#### 在add前撤销对文件的修改
```shell
    git checkout -- a.md
    # checkout命令应该是从最新的版本库中恢复的意思,如果文件add到了缓冲区，就不能这样做了
```
#### 在commit前撤销add
对文件做了一些修改，然后又把文件添加到了缓冲区，后来你又不想把这些修改提交，可以使用以下命令

```shell 
   git reset <filename>     #将某个已添加的文件从缓冲区中删除
   git reset                #将所有已添加的文件从缓冲区中删除
```
撤销了add，就意味着缓冲区的新提交的内容被丢弃，然后你如果想将文件恢复到修改前，可以使用checkout命令将文件恢复到修改前。

#### git对比工具
```shell
    git diff    #工作区和缓冲区的对比
    git diff --cached   #缓冲区和master分支的对比   
```
[更多关于git diff的知识][2]


#### git删除文件
如果删除了本地的文件，表示我们丢弃了这个文件，所以我们也需要在版本库中删除这个文件，使用以下命令

```shell
    git rm a.md     #把文件从版本库中删除
    git commit -m 'delete a.md' 
```

#### 版本撤销与回滚

```shell
    git revert HEAD     #撤销最近一次的提交
    git reset HEAD^      #回滚到上一个版本
```
**撤销与回滚的区别**
* 撤销是撤销某个版本的代码提交，将代码恢复到某个版本，并且会在master分支上再提交一次,时间线向前推进
* 回滚会将代码恢复到某个版本，但是时间线会回退
* 回滚还有安全回滚，覆盖回滚，最小回滚

  [1]: http://static.zybuluo.com/kuo-hao/9sfikny5x34ppnfzrnppmhfx/image_1bch0qu121qq72e615uf1lt17av9.png
  [2]: http://gitbook.liuhui998.com/3_5.html "更多关于git diff的知识"