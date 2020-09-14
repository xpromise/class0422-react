import React, { Component } from "react";
import { NavBar, Icon, WingBlank, InputItem, Button, Modal } from "antd-mobile";
import { Link } from "react-router-dom";

import "./index.css";

export default class VerifyPhone extends Component {
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

  render() {
    const { state } = this.props.location;

    return (
      <div className="container">
        <NavBar
          mode="light"
          icon={<Icon className="icon-left" type="left" />}
          onLeftClick={() => console.log("onLeftClick")}
        >
          硅谷注册
        </NavBar>
        <WingBlank size="lg">
          <InputItem clear placeholder="请输入手机号" className="regist-phone">
            <Link to="/common/countrypicker" className="phone-prefix">
              <span>{state ? state : "+86"}</span>
              <Icon type="down" />
            </Link>
          </InputItem>
          <WingBlank size="lg">
            <Button type="warning" disabled className="warning-btn">
              下一步
            </Button>
          </WingBlank>
        </WingBlank>
      </div>
    );
  }
}
