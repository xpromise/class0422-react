import request from "@utils/request";

// 接口前缀
const PREFIX_URL = "/common";

export const reqCountryData = () => {
  return request({
    method: "GET",
    url: PREFIX_URL + "/countryData",
  });
};
