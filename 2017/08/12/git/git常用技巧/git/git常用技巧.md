---
title: git常用技巧
tags: git
categories: git
---

### git config
`git config` 是配置git的一个命令，包括了很多选项，比如我们在git clone的时候，实在是太慢了，慢得要摔机。但是作为一个程序员，定然少不了shadowSocks了，那么我们就可以给git设置代理，通过代理clone，就可以使用你正常的网速了。

config 配置有system级别 global（用户级别） 和local（当前仓库）三个 设置先从system-> global-> local  底层配置会覆盖顶层配置 分别使用--system/global/local 可以定位到配置文件

```bash
    git config --system --list #查看system配置
    git config --global --list #查看global配置
    git config --local --list #查看本地仓库配置
```

然后我们可以给git设置socks代理，让git clone飞起来

```bash
    git config --gobal http.proxy 'socks5://127.0.0.1:1080'
    git config --gobal https.proxy 'socks://127.0.0.1:1080'
```

**然而**，有时候我们的代理可能挂了，各种原因不能用，那么我们需要把git配置还原，不然就不可能连接到github上。

```bash
    git config --unset http.proxy
    git config --unset https.proxy
```

### 快速clone
git项目中的.git文件会随着项目的版本库增大而增大。所以一些大型项目，其他.git文件也很大，用下面的命令会加速clone速度

```bash
git clone --depth=1 https://github.com/torvalds/linux.git
```

增加--depth参数，表示只拉取最新的revision


### git提交空目录
git在提交空目录的时候，会自动忽略掉，所以我们需要在空的目录下创建一个.gitkeep文件，就可以提交成功了。

### git忽略某些目录
在git project下面创建.gitignore文件，然后把你需要忽略提交的文件路径加入到里面即可，路径还可以使用正则表达式匹配。