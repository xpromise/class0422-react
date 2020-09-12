import React, { Component } from "react";
import {
  NavBar,
  Icon,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
} from "antd-mobile";
import { Link } from "react-router-dom";

import "./index.css";

export default class Login extends Component {
  render() {
    return (
      <div className="login">
        <NavBar
          mode="light"
          icon={<Icon className="login-icon-left" type="left" />}
          onLeftClick={() => console.log("onLeftClick")}
        >
          硅谷注册登录
        </NavBar>
        <WhiteSpace size="xl" />
        <WingBlank size="lg">
          <InputItem clear placeholder="请输入手机号">
            <div className="login-phone-prefix">
              <span>+86</span>
              <Icon type="down" />
            </div>
          </InputItem>
          <WhiteSpace size="lg" />
          <div className="login-code">
            <InputItem clear placeholder="请输入手机验证码" />
            <button className="login-btn-text">获取验证码</button>
          </div>
          <WhiteSpace size="lg" />
          <WingBlank size="lg">
            <Button type="warning" disabled className="login-btn">
              登录
            </Button>
          </WingBlank>
          <WhiteSpace size="lg" />
          <div className="login-btn-wrap">
            <button className="login-btn-text">账户密码登录</button>
            <button className="login-btn-text">手机快速注册</button>
          </div>
          <div className="login-other-text">其他登录方式</div>
          <div className="login-icons">
            <span className="iconfont icon-github"></span>
            <span className="iconfont icon-qq"></span>
            <span className="iconfont icon-wechat"></span>
          </div>
          <span className="login-private-policy">
            未注册的手机号验证后将自动创建硅谷账号, 登录即代表您已同意
            <Link to="/" className="login-private-policy-btn">硅谷隐私政策</Link>
          </span>
        </WingBlank>
      </div>
    );
  }
}
