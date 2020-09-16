/*  
  用来定义创建action对象的工厂函数模块
    action对象 {type: xxx, data: xxx}
    
    action分为两种：
      同步action：不发送请求，返回值action对象
      异步action：需要发送请求，返回值是一个函数
*/
import { SAVE_PHONE } from "../contants/phone";

export const savePhone = (phone) => ({ type: SAVE_PHONE, data: phone });
