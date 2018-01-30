# FileBlog

## version

    v1.1

## introduction

一个小型的文件博客，使用markdown语法，一键构建个人在线笔记本。

<!-- - [目录](#目录)
- [特点](#特点)
- [结构](#结构)
- [技术](#技术)
  + [vue](#vue)
  + [node](#node)
- [部署](#部署)
  + [部署条件](#部署条件)
  + [部署步骤](#部署步骤)
- [注意](#注意)
- [更新](#更新)  
  + [已更新](#已更新)
  + [未更新](#未更新) -->

## 特点

文件博客(fileblog)不同于传统博客(traditional blog)，

不同点(difference) |传统(traditional) | 文件(file)
---|---|---
存储(storage) | 数据库(DataBase) | 文件(File)
管理(manage) | 后端系统(backend) | 文件系统(file)
特点(Characteristic) | 定制性更强，有评论，登陆等功能，管理依赖后台，迁移复杂 | 管理方便，对文件操作即可实现管理，迁移直接拷贝，无技术门槛

## 结构

    blog目录如下
        ---- blog_vue/mark // vue 目录，如果无修改页面功能需求可以直接删除。
        ---- blog //主目录
        |---- markdown //
            |---- img // markdown引用图片
            |---- down // md文件 目录
        |---- static // 博客的样式文件
        |---- config // blog的路由导航
            |---- route.sj //文件路由导航  
        |---- index.html // blog首页
        |---- index.js // 入口文件



## 技术

### vue

基于vue2.0的前端，只用到了vue-router,略去了less,vuex,axios等工具。

### node

后端使用的node，主要使用`readfilesync`方法，读取文件并返回给页面。

### 细节功能

## 部署

### 部署条件

1. 具备node环境服务器

2. 具备git环境服务器


### 部署步骤


#### 步骤一

    git clone https://github.com/sumnow/File-Blog.git

    cd File-Blog/blog

    node server.js

blog 目录下提供了一个简单的node服务器，详情查看[这里](https://github.com/sumnow/simple-server)

#### 步骤二

将自己的md文件拷贝到blog目录下的markdown文件夹里，即可访问。

关于md文件的管理，可以选择一样托管在github上，每次使用`git`更新md文件。

也可以使用ftp文件管理，参考以下步骤

#### 步骤三

服务器文件传输工具以及终端工具，如(Xftp+Xshell,只有5M，且免安装，本例均已该工具为例)

首先使用Xftp，新建一个链接，如下

![img](../img/2017091901.png)

输入服务器信息，然后连接成功。

#### 步骤四

使用`ctrl+alt+T`打开新终端，即Xshell,输入

    node -v

查看node环境是否安装，然后选择blog文件的放置位置，如`/etc/home`

    cd /home

将`build`好的blog文件拷贝到目录下

>之后每次更新，只要使用xftp工具将自己的markdown文件夹拷贝到目录下覆盖。

之后使用shell工具

    cd /home/blog
    nohup node server.js

就部署成功了，打开

    http://your_ip_address:8080
    
即可查看博客。

## 注意

1. 博客每篇的md名不推荐中文以及“&”等奇怪文字(包括一些计算机本身不支持的外语)，虽然本身支持，但是多数服务器使用linux系统，版本和类别众多，对于中文字符的支持也不尽相同，所以使用英文可以避免许多意料之外的错误。

2. 每篇md的文章命名规则为

    YYYY-MM-DD_filename.md

3. md中的图片路径即为
    
    ../img/name

在本地也可以浏览，在服务端会被解析为绝对地址。

4. 文件本身更新不需要停止服务，直接将文件拷贝到服务器目录下即可，但要刷新页面才能看到效果。

## 更新

#### 更新

- 修复路径问题 2017-09-21

- 修复返回时候回到首页的问题 2017-11-01

- 更新页面切换的效果 2017-11-03

- 更新了搜索功能 2018-01-25

#### 待更新

- 评论功能需要数据库的辅助

- 草稿功能

- 变色主题

- 已知的浏览器兼容问题，QQ内部浏览器显示少了1vw宽度，一加手机自带浏览器打开后，滚动条失去流水效果。

- 分类功能

