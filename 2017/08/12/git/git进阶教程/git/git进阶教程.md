---
title: git进阶教程
tags: git
categories: git
---

#### git reset的几个参数
  
 1. --soft

```shell
    git reset --soft HEAD^  
```

进行版本回滚的时候，本地的代码不进行改动，当前代码相对于HEAD当前版本的改动都被添加都暂存区中，等待进一步处理,如果需要恢复一部分则需要使用reset命令，reset某个文件，再使用checkout命令，将本地版本库的文件覆盖本地文件。

2.  --hard

```shell
    git reset --hard HEAD^
```
进行版本回滚的时候，将目标版本的代码完全覆盖本地代码


3. --mixed

进行版本回滚的时候，本地代码不进行改动，只是检测出文件变更，这时可以灵活地选择恢复哪些文件，这是git的默认版本恢复设置


#### git 分支操作

```shell
    git checkout -b dev     #新建一条分支，并切换过去
    git push origin dev     #向远程仓库推送分支
    git branch -d dev       #删除本地分支
    git push --delete origin dev    #删除远程分支
    git checkout master     #切换分支回master
    git branch <branch-name> <commit_id> #恢复指定版本时期的分支
```

#### git合并分支
```shell
    git merge dev    #将dev分支合并到master分支上
    git branch       #查看分支列表
```

#### git 修复bug工作流
假如我现在正在dev分支中开发，突然被产品提了一个bug，那么我需要去修改。直接在dev分支上修改？那我正在开发的东西还没有搞完，如果直接在这个修改，我改好了，如何提交？我暂时还不想提交现在这些工作，因为都没有完成。以下命令能救你。

##### 保持现场
我希望我现在工作区相对于HEAD版本库的改动能够保存起来，当我切换到别的分支，修改完成之后，切换回来，提交bug修复版本之后，能够再接着工作。那么你应该这样

```shell
    git stash   #将改动保存到stash
```

##### 开分支修复bug
然后我们还需要再另开一条bug分支来修复bug

```shell
    git checkout -b bug
```

改好之后测试没有问题之后，再切换回dev分支中，合并bug分支到dev分支，再删掉bug分支，完工。

##### 恢复现场
```shell
    git stash apply #将保存在stash的改动还原
    git stash drop  #将stash的改动删除
    git stash pop   #还原改动并将stash的内容删除
```

可以多次stash，然后使用 `git stash list`查看你需要恢复的版本

```shell
    git stash apply stash@{1}   #恢复到第二个版本
```