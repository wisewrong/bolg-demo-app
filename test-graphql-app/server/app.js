// app.js
const Koa = require('koa');
const api = require('./router/api');
// GraphQL 下不使用 bodyParser
const bodyParser = require('koa-bodyparser');
const buildResponse =  require('./middleware/response');

// 连接数据库
require('./mongodb');

const app = new Koa();

// app.use(bodyParser());
// 统一出参格式
// app.use(buildResponse());

// 注册 API
for (const key in api) {
  const router = api[key];
  app.use(router.routes()).use(router.allowedMethods());
}

app.listen({port: 3200});
