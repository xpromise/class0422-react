import request from "@utils/request";

// 接口前缀
const PREFIX_URL = "/login";

export const reqSendCode = (phone) => {
  return request({
    method: "POST",
    url: PREFIX_URL + "/digits",
    data: {
      phone,
    },
  });
};

export const reqLogin = (phone, code) => {
  return request({
    method: "POST",
    url: PREFIX_URL + "/phone",
    data: {
      phone,
      code
    },
  });
};

export const reqPasswordLogin = (phone, password) => {
  return request({
    method: "POST",
    url: PREFIX_URL + "/user",
    data: {
      phone,
      password
    },
  });
};
