import Koa from "koa";
// @ts-ignore
import views from "koa-views";
import json from "koa-json";
// @ts-ignore
import onerror from "koa-onerror";
import bodyparser from "koa-bodyparser";
import logger from "koa-logger";

import index from "./routes/index";
import users from "./routes/users";

import { respDutationMiddleware, setResHeaderMiddleware, respDataMiddleware } from "./middleware";
import WebSocketService from "./service/web_socket_service";
const app = new Koa();

// 计算服务器消耗时长的中间件
app.use(respDutationMiddleware);
// 设置响应头的中间件
app.use(setResHeaderMiddleware);

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"],
  })
);
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug",
  })
);

// logger
app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes()).use(index.allowedMethods());
app.use(users.routes()).use(users.allowedMethods());

app.use(respDataMiddleware);

// 开启服务端的监听，监听客户端的连接
// 当某一个客户端连接成功之后，就会对这个客户端进行 message 事件的监听
WebSocketService.listen();

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

export default app;
