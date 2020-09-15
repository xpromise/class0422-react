import React, { Component } from "react";
import { NavBar, Icon, WingBlank, InputItem, Button, Modal } from "antd-mobile";
import { Link } from "react-router-dom";
import { createForm } from "rc-form";

import { reqVerifyPhone } from "@api/regist";

import "./index.css";

const PHONE_REG = /(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|198)[0-9]{8}$/;

class VerifyPhone extends Component {
  state = {
    isDisabled: true,
  };

  componentDidMount() {
    if (this.props.location.state) return;
    // 弹出警告提示框
    Modal.alert(
      // 标题
      "注册协议及隐私政策",
      // 内容
      <div>
        <span className="policy-text">
          在您注册成为硅谷用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，
          <span>
            请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）：
          </span>
        </span>
        <p className="policy-link-tip">《硅谷用户注册协议》</p>
        <p className="policy-link-tip">《硅谷隐私政策》</p>
      </div>,
      // 按钮
      [
        {
          text: "不同意",
          onPress: () => this.props.history.push("/login"),
        },
        {
          text: "同意",
          // onPress: () => console.log("ok"),
          style: { backgroundColor: "red", color: "#fff" },
        },
      ]
    );
  }

  // 校验表单的函数
  validator = (rule, value, callback) => {
    /*
      rule 规则：包含了表单项字段
      value 表单项的值
    */

    let isDisabled = true;
    if (value && value.length === 11 && PHONE_REG.test(value)) {
      isDisabled = false;
    }
    this.setState({
      isDisabled,
    });
    // 必须要调用(如果不调用，将来就收集不到表单数据)
    /*
      校验成功 callback();
      校验失败 callback(message);
    */
    callback();
  };

  next = () => {
    const phone = this.props.form.getFieldValue("phone");
    // console.log(phone);
    // 发送请求，验证手机号是否正确
    reqVerifyPhone(phone)
      .then((res) => {
        // console.log(res);
        // 手机号没有注册过

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
                // 将phone存储在localstorage中
                localStorage.setItem("phone", phone);
                // 去下一个页面
                this.props.history.push("/regist/verifycode", phone);
              },
              style: { backgroundColor: "red", color: "#fff" },
            },
          ]
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { state } = this.props.location;
    const { getFieldProps } = this.props.form;
    const { isDisabled } = this.state;

    return (
      <div className="container">
        <NavBar
          mode="light"
          icon={<Icon className="icon-left" type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          硅谷注册
        </NavBar>
        <WingBlank size="lg">
          <InputItem
            {...getFieldProps(
              // 表单字段
              "phone",
              {
                rules: [
                  // 表单校验规则
                  {
                    // 自定义表单校验规则
                    // 当用户输入数据时，会触发
                    validator: this.validator,
                  },
                ],
              }
            )}
            clear
            placeholder="请输入手机号"
            className="regist-phone"
          >
            <Link to="/common/countrypicker" className="phone-prefix">
              <span>{state ? state : "+86"}</span>
              <Icon type="down" />
            </Link>
          </InputItem>
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
        </WingBlank>
      </div>
    );
  }
}

// createForm是一个高阶组件，负责给VerifyPhone传递form属性
// form包含了表单项所有参数
export default createForm()(VerifyPhone);
