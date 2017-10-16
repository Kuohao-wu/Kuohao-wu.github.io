---
title: ubuntu下源码包方式安装apache2
tags: 源码安装
categories: linux
---

### 下载apache源码包编译安装

```bash
wget http://mirrors.tuna.tsinghua.edu.cn/apache//httpd/httpd-2.4.25.tar.bz2
tar zxf httpd-2.4.25.tar.bz2 && cd httpd-2.4.25.tar.bz2
./configure --prefix=/usr/local/apache2  #检查配置，设置安装路径
make   #编译源码
```

### 检查提示
这时，httpd会提示我们缺少了apr依赖，所以我们得安装apr依赖。

```bash
wget http://mirrors.cnnic.cn/apache//apr/apr-1.5.2.tar.gz
tar zxf apr-1.5.2.tar.gz && cd apr-1.5.2
./configure --prefix=/usr/local/apr
make
sudo make install
```
然后apache2安装还需要apr-util依赖，pcre依赖，一并安装了
安装apr-util

```bash
    wget http://mirrors.cnnic.cn/apache//apr/apr-1.5.2.tar.gz 
    tar zxf apr-1.5.2.tar.gz && cd apr-1.5.2
    ./configure --with-apr=/usr/local/apr --prefix=/usr/local/apr-util
    ##apr-util依赖apr，所以需要使用--with指定依赖路径
    make
    sudo make install
```
安装pcre

```bash
ftp ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre
ftp>get pcre-8.40.tar.gz
ftp>bye
tar zxf pcre-8.40.tar.gz && cd pcre-8.40
./configure --prefix=/usr/local/pcre
make
sudo make install
```

### 重新配置httpd

```bash
    ./configure --with-apr=/usr/local/apr --with-apr-util=/usr/local/apr-util --with-pcre=/usr/local/pcre --prefix=/usr/local/apache2
    make 
    sudo make install
```
这样终于把apche2安装好了，真是够折腾的了。

### 测试apache
```bash
    /usr/local/apache2/bin/apachectl start
```
然后发现报了个错，说我们没有配置ServerName，这时我们需要打开apache的http-conf目录进行配置

```bash
    sudo vim http-conf/conf
    ###  使用vim命令进行搜索
    :/\cservername   ##/表示搜索关键字，\c表示不区分大小写
    ##找到 ServerName www.example.com:80 一行，将其修改为
    ServerName yourIpAddress(你的ip地址) 
    ###如果需要修改端口，则搜索Listen关键词，找到这一行
    Listen 80   #apache默认监听80端口，可以改为其他的
```
然后重新启动apache

```bash
    /usr/local/apache2/bin/apachectl start
    ##如果嫌长的，可以添加alias别名，之前的mac下使用ssh免密登录的文章有写，可以去看看
```

### 注意事项
如果我们使用apt-get的方式去装LAMP集成环境的时候，系统会自动将我们的apache2，mysql注册成系统服务，我们只需要这样调用即可

```bash
    service apache2 start
    service mysql start
```