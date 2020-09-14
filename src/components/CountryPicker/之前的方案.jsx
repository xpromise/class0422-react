import React, { Component, Fragment } from "react";
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
        console.log("成功~", res);
        this.setState({
          countryData: res,
        });
      })
      .catch((err) => {
        console.log("失败~", err);
      });
  }

  jumpToCountry = (e) => {
    // console.log(e.target.textContent);
    document.getElementById(e.target.textContent).scrollIntoView();
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
          onLeftClick={() => console.log("onLeftClick")}
        >
          选择国家或者地区
        </NavBar>
        <div className="country-navbar" onTouchEnd={this.jumpToCountry}>
          {keys.map((key, index) => {
            return <a key={index}>{key}</a>;
          })}
        </div>
        <div className="country-container">
          {keys.map((key, index) => {
            const items = countryData[key];
            return (
              <div key={index} className="country-list">
                <div className="country-first" id={key}></div>
                <List renderHeader={() => key}>
                  {items.map((item, index) => {
                    // 注意item是对象
                    const key = Object.keys(item)[0];
                    const value = item[key];
                    return (
                      <Item
                        className="country-item"
                        key={index}
                        extra={"+" + value}
                      >
                        {key}
                      </Item>
                    );
                  })}
                </List>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
