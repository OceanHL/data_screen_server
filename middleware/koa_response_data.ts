/*
 * @Author: jhl
 * @Date: 2021-11-08 20:07:42
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-08 20:55:13
 * @Description:
 */
// 处理业务逻辑的中间件，读取某个 json 文件的数据
import { Middleware } from 'koa';
import path from 'path';
import { getFileJsonData } from '../utils';

const respDataMiddleware: Middleware = async (ctx, next) => {
    const url = ctx.request.url; //
    let filePath = url.replace('/api', ''); // /seller
    filePath = '../data' + filePath + '.json'; // ../data/seller.json
    filePath = path.join(__dirname, filePath);
    const ret = await getFileJsonData(filePath);
    ctx.body = ret;
    await next();
};

export default respDataMiddleware;
