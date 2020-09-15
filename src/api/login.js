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
