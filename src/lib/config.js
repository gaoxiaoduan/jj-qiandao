module.exports = {
  COOKIE: process.env.COOKIE || '',
  // 自动玩游戏需要此参数，在掘金首页打开控制台输入这行代码`window.__NUXT__.state.auth.user.id`就可以得到
  USERID: process.env.USERID || '',
  AUTO_CHECK_IN: process.env.AUTO_CHECK_IN || true, // 是否开启自动签到，默认开启
  DINGTALK_WEBHOOK: process.env.DINGTALK_WEBHOOK || '',
  DINGTALK_SECRET: process.env.DINGTALK_SECRET || '',
  ALL_IN: process.env.ALL_IN || '',
  WX_COMPANY_ID: process.env.WX_COMPANY_ID || '', // 企业 ID
  WX_APP_ID: process.env.WX_APP_ID || '', // 应用 ID
  WX_APP_SECRET: process.env.WX_APP_SECRET || '', // 应用 secret
  FEISHU_WEBHOOK: process.env.FEISHU_WEBHOOK || '',
  FEISHU_SECRET: process.env.FEISHU_SECRET || ''
}
