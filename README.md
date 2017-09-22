# fileblog

一个小型的文件博客。

## 特点

文件博客(fileblog)不同于传统博客(traditional blog)，


不同点(difference) |传统(traditional) | 文件(file)
---|---|---
存储(storage) | 数据库(DataBase) | 文件(File)
管理(manage) | 后端系统(backend) | 文件系统(file)
特点(Characteristic) | 定制性更强，有评论，登陆等功能，管理依赖后台，迁移复杂 | 评论登陆功能实现过于麻烦，管理方便，对文件操作即可实现管理，内容依赖文件，迁移直接拷贝，无技术门槛

## 操作方式

依赖markdown语法，每一篇都是一个md文件，方便管理，只需要在终端里将文件上传至服务器指定目录就可以完成更新，删除也只需要删除文档即可。


## 技术

### vue

基于vue2.0的前端，只用到了vue-router,略去了less,vuex,axios等工具。

### node

后端使用的node，主要使用readfilesync方法，读取文件并返回给页面。

## 部署指南

#### 部署条件

1. 具备node环境服务器

2. 服务器文件传输工具以及终端工具，如(Xftp+Xshell,只有5M，且免安装，本例均已该工具为例)

![img](../img/20170919.png)



## todo

- 评论功能需要数据库的辅助

- 草稿功能

- 页面的过渡效果



