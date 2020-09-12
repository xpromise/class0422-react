/*
  路由配置
*/

import { lazy } from "react";

// 使用路由懒加载
// lazy不能单独使用，必须配置Suspence组件才能一起使用
const Login = lazy(() =>
  import(/* webpackChunkName: 'Login' */ "@pages/Login")
);

const routes = [
  {
    path: "/login",
    component: Login,
  },
];

export default routes;
