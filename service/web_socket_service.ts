/*
 * @Author: jhl
 * @Date: 2021-11-12 17:02:29
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-13 10:34:49
 * @Description:
 */
// WebSocket
import WebSocket from "ws";
import { join } from "path";
import { getFileJsonData } from "../utils";
// 创建 WebSocket 服务端的对象，绑定的端口是9998
const wss = new WebSocket.Server({
  port: 9998, // 绑定端口
});

class SingleWebSocket {
  static instance: null | SingleWebSocket = null;
  private constructor() {}
  listen() {
    // 对客户端的链接事件进行监听
    // client 代表的是客户端的链接 socket 对象
    wss.on("connection", client => {
      console.log("有客户端连接成功了...");
      // 对客户端的连接对象（client）进行 message 事件的监听
      // msg 由客户端发给服务端的数据
      client.on("message", async msg => {
        console.log("客户端发送过来的数据", msg.toString());
        let payload = JSON.parse(msg.toString());
        const action = payload.action;
        if (action === "getData") {
          // 拼接文件路径  payload.chartName 可能是 trend seller map rank hot stock
          const filePath = join(__dirname, "../data", payload.chartName + ".json");
          const ret = await getFileJsonData(filePath);
          // 需要在服务端获取到数据的基础之上，增加一个 data 的字段
          // data 所对应的值，就是某个 json 文件的内容
          payload.data = ret;
          client.send(JSON.stringify(payload));
        } else {
          // 原封不动的将所接收到的数据转发给每一个处于连接状态的客户端
          // wss.clients // 所有客户端的连接
          wss.clients.forEach(client => {
            client.send(msg.toString());
          });
        }
        // 由服务端往客户端发送数据
        // client.send("hello socket from backend");
      });
    });
  }
  static getInstance() {
    if (!SingleWebSocket.instance) {
      SingleWebSocket.instance = new SingleWebSocket();
    }
    return SingleWebSocket.instance;
  }
}

// 服务端开启监听
export default SingleWebSocket.getInstance();
