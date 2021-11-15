/*
 * @Author: jhl
 * @Date: 2021-11-08 20:08:02
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-08 20:21:46
 * @Description:
 */
// 计算服务器消耗时长的中间件
import { Middleware } from 'koa';

const respDutationMiddleware: Middleware = async (ctx, next) => {
    // 1、记录开始时间
    const start = Date.now();
    // 2、让内层中间件得到执行
    await next();
    // 3、记录结束的时间
    const end = Date.now();
    // 设置响应头 X-Response-Time
    const duration = end - start;
    // ctx.set 设置响应头
    ctx.set('X-Response-Time', duration + 'ms');
};

export default respDutationMiddleware;
