/*
  汇总所有reducers函数
*/
import { combineReducers } from "redux";
import phone from "./phone";
import user from "./user";
// import { bbb } from "@pages/register/store";

/*
  假设：管理的state是phone
    之前只有一个reducer函数，所有state就是phone
    现在有n个reducer函数（被汇总成一个），state就是一个对象
      对象中包含n个数据：{phone: xxx, user: xxx}
*/
// 将n个reducer函数汇总成一个
export default combineReducers({
  // n个reducer函数
  phone,
  user,
  // bbb
});
