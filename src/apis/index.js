import service from "@/plugins/request";

// 获取用户openid等信息
export const getUserInfo = (params) => service({
  method: "get",
  url: "/wd/weixin/getUserInfo",
  params
})

// 获取access_token
export const getAccessToken = () => service('/wd/weixin/getAccessToken')

// 获取jsapi_ticket
export const getJsapiTicket = () => service('/wd/weixin/getJsapiTicket')
