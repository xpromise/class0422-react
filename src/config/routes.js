/*
  路由配置
*/

import { lazy } from "react";

// 使用路由懒加载
// lazy不能单独使用，必须配置Suspence组件才能一起使用
const Login = lazy(() =>
  import(/* webpackChunkName: 'Login' */ "@pages/Login")
);

const VerifyPhone = lazy(() =>
  import(
    /* webpackChunkName: 'VerifyPhone' */ "@pages/register/components/VerifyPhone"
  )
);

const VerifyCode = lazy(() =>
  import(
    /* webpackChunkName: 'VerifyCode' */ "@pages/register/components/VerifyCode"
  )
);

const VerifyPassword = lazy(() =>
  import(
    /* webpackChunkName: 'VerifyPassword' */ "@pages/register/components/VerifyPassword"
  )
);

const CountryPicker = lazy(() =>
  import(/* webpackChunkName: 'CountryPicker' */ "@comps/CountryPicker")
);

const routes = [
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/regist/verifyphone",
    component: VerifyPhone,
  },
  {
    path: "/regist/verifycode",
    component: VerifyCode,
  },
  {
    path: "/regist/verifypassword",
    component: VerifyPassword,
  },
  {
    path: "/common/countrypicker",
    component: CountryPicker,
  },
];

export default routes;
