/*
 * @Author: jhl
 * @Date: 2021-11-08 20:09:48
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-08 20:58:34
 * @Description:
 */
import fs from 'fs/promises';
// 读取文件的工具方法
export async function getFileJsonData(filePath: string) {
    // 根据文件的路径，读取文件的内容
    try {
        return await fs.readFile(filePath, 'utf-8');
    } catch (error) {
        return JSON.stringify({
            message: '读取文件内容失败，文件资源不存在',
            status: 404,
        });
    }
}
