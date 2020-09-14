import React, { Component } from "react";
import { NavBar, Icon, List } from "antd-mobile";

import { reqCountryData } from "@api/common";
import "./index.css";

const Item = List.Item;

export default class CountryPicker extends Component {
  state = {
    countryData: {},
  };

  componentDidMount() {
    // 发送请求请求数据
    reqCountryData()
      .then((res) => {
        // console.log("成功~", res);
        this.setState({
          countryData: res,
        });
      })
      .catch((err) => {
        console.log("失败~", err);
      });
  }

  jumpToCountry = (e) => {
    // offsetTop 开启定位父元素的距离
    window.scrollTo(0, document.getElementById(e.target.textContent).offsetTop);
  };

  selectCountry = (value) => {
    return () => {
      this.props.history.push("/regist/verifyphone", value);
    };
  };

  render() {
    const { countryData } = this.state;

    const keys = Object.keys(countryData);

    return (
      <div className="country">
        <NavBar
          className="country-nav"
          mode="light"
          icon={<Icon className="icon-left" type="left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          选择国家或者地区
        </NavBar>
        {/* 右侧导航 */}
        <div className="country-navbar" onTouchEnd={this.jumpToCountry}>
          {keys.map((key, index) => {
            // eslint-disable-next-line
            return <a key={index}>{key}</a>;
          })}
        </div>
        {/* 列表展示 */}
        <div className="country-container">
          {keys.map((key, index) => {
            const items = countryData[key];
            return (
              <List id={key} key={index} renderHeader={() => key}>
                {items.map((item, index) => {
                  // 注意item是对象
                  const key = Object.keys(item)[0];
                  const value = "+" + item[key];
                  return (
                    <Item
                      className="country-item"
                      key={index}
                      extra={value}
                      onClick={this.selectCountry(value)}
                    >
                      {key}
                    </Item>
                  );
                })}
              </List>
            );
          })}
        </div>
      </div>
    );
  }
}
