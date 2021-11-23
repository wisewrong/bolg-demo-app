# Test-GraphQL-App

>The demo for practicing GraphQL.
>
>Node.js + Koa + MongoDB + GraphQL + Vue.
>
>Article link: https://www.cnblogs.com/wisewrong/p/13306994.html



## 一、目录介绍

目录中带有 `-old` 后缀的文件，是指使用传统 API 格式的文件，在运行 GraphQL 服务的时候不会使用。

### 1. server - 后端服务

启动服务

```
npm run start
```

后端数据库使用的是 Mongodb，并引入了 Mongoose 操作数据库。

在启动服务前，需要先启动自己的 MongoDB，并在 `/server/config.js` 文件中配置数据库地址。

关于 GraphQL 的 Schema 配置都在 `/server/graphql` 下，然后在 `/server/controllers` 中使用。

### 2. fe - 前端应用

启动应用

```
npm run dev
```

简单封装了一下 Axios，如需修改，可以在对应的模块下（如 `/src/api/home/index.js`）添加请求方法，然后在页面中以`this.$api[模块][请求方法]`的结构调用，示例：`this.$api.home.getMovieList()`。

`/src/api/home/index.js`中的`buildParams()`只是一个试验品，并非解决方案。



##  二、效果演示

![](https://img2020.cnblogs.com/blog/1059788/202007/1059788-20200724135450005-417514786.gif)

