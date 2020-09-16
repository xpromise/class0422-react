import React, { Component } from "react";
import {
  NavBar,
  Icon,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Toast,
} from "antd-mobile";
import { Link } from "react-router-dom";
import { createForm } from "rc-form";

import { PHONE_REG, CODE_REG } from "@utils/reg";
import { reqSendCode, reqLogin } from "@api/login";

import "./index.css";

class Login extends Component {
  state = {
    isDisabledGetCode: true,
    isDisabledLogin: true,
    isSendCode: false,
    timeout: 60,
  };

  validator = (rule, value, callback) => {
    const field = rule.field;
    // 是否禁止获取验证码
    let isDisabledGetCode = true;
    let isDisabledLogin = true;

    if (field === "phone") {
      // 校验手机号
      if (value && value.length === 11 && PHONE_REG.test(value)) {
        // 校验通过
        isDisabledGetCode = false;
      }

      this.setState({
        isDisabledGetCode,
      });
    } else {
      if (
        // 验证码
        value &&
        value.length === 6 &&
        CODE_REG.test(value)
      ) {
        // 校验通过
        isDisabledLogin = false;
      }

      this.setState({
        isDisabledLogin,
      });
    }

    callback();
  };

  sendCode = () => {
    const { isDisabledGetCode, isSendCode } = this.state;

    if (isDisabledGetCode || isSendCode) return;

    const phone = this.props.form.getFieldValue("phone");

    reqSendCode(phone)
      .then(() => {
        // 启动倒计时
        this.setState({
          isSendCode: true,
        });

        const timer = setInterval(() => {
          const { timeout } = this.state;
          const result = timeout - 1;

          if (result <= 0) {
            this.setState({
              isSendCode: false,
              timeout: 60,
            });
            clearInterval(timer);
            return;
          }

          this.setState({
            timeout: result,
          });
        }, 1000);
      })
      .catch();
  };

  login = () => {
    if (!this.state.isSendCode) {
      Toast.info("请先获取验证码");
      return;
    }
    // 收集数据
    const { phone, code } = this.props.form.getFieldsValue();
    reqLogin(phone, code)
      .then((res) => {
        console.log(res);
        this.props.history.push("/");
      })
      .catch((err) => {
        Toast.info(err);
      });
  };

  loginByGithub = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=5229ff4071eba4864cc9`;
  };

  render() {
    const { getFieldProps } = this.props.form;
    const {
      isDisabledGetCode,
      isDisabledLogin,
      isSendCode,
      timeout,
    } = this.state;

    return (
      <div className="login container">
        <NavBar
          mode="light"
          icon={<Icon className="icon-left" type="left" />}
          onLeftClick={() => console.log("onLeftClick")}
        >
          硅谷注册登录
        </NavBar>
        <WhiteSpace size="xl" />
        <WingBlank size="lg">
          <InputItem
            clear
            placeholder="请输入手机号"
            {...getFieldProps("phone", {
              rules: [
                {
                  validator: this.validator,
                },
              ],
            })}
          >
            <div className="phone-prefix">
              <span>+86</span>
              <Icon type="down" />
            </div>
          </InputItem>
          <WhiteSpace size="lg" />
          <div className="login-code">
            <InputItem
              clear
              placeholder="请输入手机验证码"
              {...getFieldProps("code", {
                rules: [
                  {
                    validator: this.validator,
                  },
                ],
              })}
            />
            <button
              className="login-btn-text login-btn"
              style={{
                color: isSendCode || isDisabledGetCode ? "#848689" : "red",
              }}
              onTouchEnd={this.sendCode}
            >
              {isSendCode ? `重新发送(${timeout}s)` : "获取验证码"}
            </button>
          </div>
          <WhiteSpace size="lg" />
          <WingBlank size="lg">
            <Button
              type="warning"
              disabled={isDisabledLogin || isDisabledGetCode}
              className="warning-btn"
              onClick={this.login}
            >
              登录
            </Button>
          </WingBlank>
          <WhiteSpace size="lg" />
          <div className="login-btn-wrap">
            <Link to="/login/pwd" className="login-btn-text">
              账户密码登录
            </Link>
            <Link to="/regist/verifyphone" className="login-btn-text">
              手机快速注册
            </Link>
          </div>
          <div className="login-other-text">其他登录方式</div>
          <div className="login-icons">
            <span
              onTouchEnd={this.loginByGithub}
              className="iconfont icon-github"
            ></span>
            <span className="iconfont icon-qq"></span>
            <span className="iconfont icon-wechat"></span>
          </div>
          <span className="login-private-policy">
            未注册的手机号验证后将自动创建硅谷账号, 登录即代表您已同意
            <Link to="/" className="login-private-policy-btn">
              硅谷隐私政策
            </Link>
          </span>
        </WingBlank>
      </div>
    );
  }
}

export default createForm()(Login);
