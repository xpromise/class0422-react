import React, { Component } from "react";
import { NavBar, Icon } from "antd-mobile";

import { reqCountryData } from "@api/common";

export default class CountryPicker extends Component {
  componentDidMount() {
    // 发送请求请求数据
    reqCountryData()
      .then((res) => {
        console.log("成功~", res);
      })
      .catch((err) => {
        console.log("失败~", err);
      });
  }

  render() {
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon className="icon-left" type="left" />}
          onLeftClick={() => console.log("onLeftClick")}
        >
          选择国家或者地区
        </NavBar>
      </div>
    );
  }
}
