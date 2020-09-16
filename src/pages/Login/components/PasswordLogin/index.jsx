import React, { useState, useCallback } from "react";
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
import { PHONE_REG, PASSWORD_REG } from "@utils/reg";

import { reqPasswordLogin } from "@api/login";

import "./index.css";

function PasswordLogin({ form: { getFieldProps, getFieldsValue }, history }) {
  // 在工厂函数组件定义state数据
  const [isPassword, setIsPassword] = useState(true);

  const [isPhoneOK, setIsPhoneOK] = useState(true);
  const [isPasswordOK, setIsPasswordOK] = useState(true);

  /*
    useEffect(() => { return () => {} }, []) 用来使用生命周期函数
  */

  // 使用useCallback缓存函数
  const changeInputType = useCallback(() => {
    // 更新state
    setIsPassword(!isPassword);
  }, [isPassword]);

  const validator = useCallback((rule, value, callback) => {
    const field = rule.field;

    if (field === "phone") {
      // 用户名
      if (value && value.length === 11 && PHONE_REG.test(value)) {
        setIsPhoneOK(false);
      } else {
        setIsPhoneOK(true);
      }
    } else {
      // 密码
      if (
        value &&
        value.length >= 8 &&
        value.length <= 20 &&
        PASSWORD_REG.test(value)
      ) {
        setIsPasswordOK(false);
      } else {
        setIsPasswordOK(true);
      }
    }

    callback();
  }, []);

  const login = useCallback(() => {
    const { phone, password } = getFieldsValue();
    reqPasswordLogin(phone, password)
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        Toast.fail(err);
      });
  }, []);

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
          placeholder="用户名/邮箱/手机号"
          {...getFieldProps("phone", {
            rules: [
              {
                validator,
              },
            ],
          })}
        />
        <WhiteSpace size="lg" />
        <div className="login-code">
          <InputItem
            {...getFieldProps("password", {
              rules: [
                {
                  validator,
                },
              ],
            })}
            clear
            placeholder="请输入密码"
            type={isPassword ? "password" : "text"}
            extra={
              <span
                onTouchEnd={changeInputType}
                className={
                  "iconfont " + (isPassword ? "icon-eye1" : "icon-eye")
                }
              ></span>
            }
          />
          <button
            className="login-btn-text login-btn"
            // onTouchEnd={this.sendCode}
            style={{ color: "#000" }}
          >
            忘记密码
          </button>
        </div>
        <WhiteSpace size="lg" />
        <WingBlank size="lg">
          <Button
            type="warning"
            disabled={isPasswordOK || isPhoneOK}
            className="warning-btn"
            onClick={login}
          >
            登录
          </Button>
        </WingBlank>
        <WhiteSpace size="lg" />
        <div className="login-btn-wrap">
          <Link to="/login" className="login-btn-text">
            短信验证码登录
          </Link>
          <Link to="/regist/verifyphone" className="login-btn-text">
            手机快速注册
          </Link>
        </div>
        <div className="login-other-text">其他登录方式</div>
        <div className="login-icons">
          <span
            // onTouchEnd={this.loginByGithub}
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

export default createForm()(PasswordLogin);
