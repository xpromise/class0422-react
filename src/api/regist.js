import request from "@utils/request";

// 接口前缀
const PREFIX_URL = "/regist";

export const reqVerifyPhone = (phone) => {
  return request({
    method: "POST",
    url: PREFIX_URL + "/verify_phone",
    data: {
      phone,
    },
  });
};
