/*
 * @Author: jhl
 * @Date: 2021-11-08 20:09:16
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-08 21:06:05
 * @Description:
 */
// 设置响应头的中间件
import { Middleware } from 'koa';

const setResHeaderMiddleware: Middleware = async (ctx, next) => {
    ctx.set('Content-Type', 'application/json; charset=utf-8');
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'OPTIONS, GET, PUT, POST, DELETE');
    await next();
};

export default setResHeaderMiddleware;
