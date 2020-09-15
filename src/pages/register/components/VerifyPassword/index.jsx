import React, { Component } from "react";
import { NavBar, Icon, WingBlank, InputItem, Button, Toast } from "antd-mobile";
import { Link } from "react-router-dom";
import { createForm } from "rc-form";

import { reqRegist } from "@api/regist";
import { PASSWORD_REG } from "@utils/reg";
// 需要引入图片
import msg from "./msg.png";
import "./index.css";

class VerifyPassword extends Component {
  state = {
    isDisabled: true,
    isPassword: true,
  };

  changeInputType = () => {
    this.setState({
      isPassword: !this.state.isPassword,
    });
  };

  validator = (rule, value, callback) => {
    let isDisabled = true;
    if (
      value &&
      value.length >= 8 &&
      value.length <= 20 &&
      PASSWORD_REG.test(value)
    ) {
      isDisabled = false;
    }
    this.setState({
      isDisabled,
    });
    callback();
  };

  next = () => {
    const phone = this.props.location.state || localStorage.getItem("phone");
    const password = this.props.form.getFieldValue("password");
    reqRegist(phone, password)
      .then((res) => {
        this.props.history.push("/");
      })
      .catch((err) => {
        Toast.fail("注册失败，请重新注册~");
      });
  };

  render() {
    const { isDisabled, isPassword } = this.state;
    const { getFieldProps } = this.props.form;

    return (
      <div className="password">
        <NavBar
          mode="light"
          icon={<Icon className="icon-left" type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          硅谷注册
        </NavBar>
        <WingBlank size="lg">
          <img src={msg} alt="msg" className="password-img" />
          <p className="password-msg">请设置登录密码</p>
          <InputItem
            {...getFieldProps("password", {
              rules: [
                {
                  validator: this.validator,
                },
              ],
            })}
            clear
            placeholder="请设置8-20位登录密码"
            type={isPassword ? "password" : "text"}
            extra={
              <span
                onTouchEnd={this.changeInputType}
                className={
                  "iconfont " + (isPassword ? "icon-eye1" : "icon-eye")
                }
              ></span>
            }
          />
          <p className="password-text">
            密码由8-20位字母、数字或半角符号组成，不能是10位以下纯数字/字母/半角符号，字母需区分大小写
          </p>
          <WingBlank size="lg">
            <Button
              type="warning"
              disabled={isDisabled}
              className="warning-btn"
              onClick={this.next}
            >
              下一步
            </Button>
          </WingBlank>
          <div className="password-question">
            <span>遇到问题？请</span>
            <Link className="password-question-link" to="/">
              联系客服
            </Link>
          </div>
        </WingBlank>
      </div>
    );
  }
}

export default createForm()(VerifyPassword);
