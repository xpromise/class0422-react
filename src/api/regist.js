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

export const reqVerifyCode = (phone, code) => {
  return request({
    method: "POST",
    url: PREFIX_URL + "/verify_code",
    data: {
      phone,
      code,
    },
  });
};


export const reqRegist = (phone, password) => {
  return request({
    method: "POST",
    url: PREFIX_URL + "/user",
    data: {
      phone,
      password,
    },
  });
};