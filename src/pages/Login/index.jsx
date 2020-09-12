import React, { Component } from "react";
import { NavBar, Icon, InputItem, WingBlank, WhiteSpace } from "antd-mobile";

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
          <WhiteSpace size="md" />
          <div className="login-code">
            <InputItem clear placeholder="请输入手机验证码" />
            <button>获取验证码</button>
          </div>
          <WhiteSpace size="md" />
          
        </WingBlank>
      </div>
    );
  }
}
