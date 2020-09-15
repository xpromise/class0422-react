import React, { Component } from "react";
import { NavBar, Icon, WingBlank, InputItem, Button, Modal } from "antd-mobile";
import { Link } from "react-router-dom";
import { createForm } from "rc-form";

import { reqSendCode } from "@api/login";

import "./index.css";
// 需要引入图片
import msg from "./msg.png";

const CODE_REG = /[0-9]{6}/;

class VerifyCode extends Component {
  state = {
    isDisabled: true,
    timeout: 60,
    isSendCode: false,
  };

  sendCode = () => {
    const phone = this.props.location.state || localStorage.getItem("phone");

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

  resend = () => {
    const phone = this.props.location.state || localStorage.getItem("phone");

    Modal.alert(
      // 标题
      "",
      // 内容
      "我们将发送短信/语音验证码至：" + phone,
      // 按钮
      [
        {
          text: "取消",
          // onPress: () => {},
        },
        {
          text: "确认",
          onPress: () => {
            this.sendCode();
          },
          style: { backgroundColor: "red", color: "#fff" },
        },
      ]
    );
  };

  componentDidMount() {
    this.sendCode();
  }

  validator = (rule, value, callback) => {
    let isDisabled = true;
    if (value && value.length === 6 && CODE_REG.test(value)) {
      isDisabled = false;
    }
    this.setState({
      isDisabled,
    });
    callback();
  };

  render() {
    const { isDisabled, timeout, isSendCode } = this.state;
    const { getFieldProps } = this.props.form;

    return (
      <div className="code">
        <NavBar
          mode="light"
          icon={<Icon className="icon-left" type="left" />}
          onLeftClick={() => this.props.history.push("/login")}
        >
          硅谷注册
        </NavBar>
        <WingBlank size="lg">
          <img src={msg} alt="msg" className="code-img" />
          <p className="code-msg">
            我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话
          </p>
          <div className="code-input-container">
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
              className={isSendCode ? "sendcode-btn" : ""}
              disabled={isSendCode}
              onTouchEnd={this.resend}
            >
              {isSendCode ? (
                <span>
                  重新发送<span style={{ fontSize: 12 }}>({timeout}s)</span>
                </span>
              ) : (
                "获取验证码"
              )}
            </button>
          </div>
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
          <div className="code-question">
            <span>遇到问题？请</span>
            <Link className="code-question-link" to="/">
              联系客服
            </Link>
          </div>
        </WingBlank>
      </div>
    );
  }
}

export default createForm()(VerifyCode);
