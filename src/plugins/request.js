import axios from "axios";

const service = axios.create({
  baseURL: "/",
  timeout: 60000
})

service.interceptors.request.use(
  (request) => {
    return Promise.resolve(request);
  },
  (error) => {
    return Promise.reject(error);
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.data.code === "000000" || response.data.size) {
      // empty
    } else {
      console.error(response.data.message || response.data.errmsg || "系统异常");
    }
    return Promise.resolve(response.data);
  },
  (error) => {
    console.error(error || "系统异常");
    return Promise.reject(error);
  }
)

export default service;