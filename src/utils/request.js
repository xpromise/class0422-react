import axios from "axios";

const request = axios.create({
  baseURL: "",
  timeout: 10000,
  headers: {},
});

// 请求拦截器
request.interceptors.request.use((config) => {
  // 修改config
  // 添加请求头数据 / 参数...

  // config.headers.authrization = `Bearer ${token}`

  return config;
});

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    // 响应成功 --> 状态码 2xx
    // 响应体数据
    const result = res.data;
    // 判断功能是否成功
    if (result.code === 20000) {
      // 功能成功
      // 返回成功的数据
      return result.data;
    } else {
      // 功能失败
      // 返回失败的原因
      return Promise.reject(result.message);
    }
  },
  (err) => {
    // 响应失败 --> 状态码不是2xx开头
    /*
      404 401 500 0
    */
    // 处理错误原因
    return Promise.reject(err.message);
  }
);

export default request;
