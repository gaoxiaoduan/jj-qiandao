module.exports = {
  COOKIE: process.env.COOKIE || '',
  // 自动玩游戏需要此参数，在掘金首页打开控制台输入这行代码`window.__NUXT__.state.auth.user.id`就可以得到
  USERID: process.env.USERID || '',
  UUID: process.env.UUID || '',
  COMMITID: process.env.COMMITID || '', // 评论id
  COMMITTYPE: process.env.COMMITTYPE || true, // 评论类型（true:沸点 false:文章）
  ASSIST_USER_ID: process.env.ASSIST_USER_ID || '', // 助力目标id (目标USERID)
  ASSIST_DAY: process.env.ASSIST_DAY || '6', // 助力时间(默认为周六)
  AUTO_CHECK_IN: process.env.AUTO_CHECK_IN || true, // 是否开启自动签到，默认开启
  SKIP_DRAW: process.env.SKIP_DRAW || false, // 是否跳过抽奖
  DINGTALK_WEBHOOK: process.env.DINGTALK_WEBHOOK || '',
  DINGTALK_SECRET: process.env.DINGTALK_SECRET || '',
  ALL_IN: process.env.ALL_IN || '',
  WX_COMPANY_ID: process.env.WX_COMPANY_ID || '', // 企业 ID
  WX_APP_ID: process.env.WX_APP_ID || '', // 应用 ID
  WX_APP_SECRET: process.env.WX_APP_SECRET || '', // 应用 secret
  FEISHU_WEBHOOK: process.env.FEISHU_WEBHOOK || '',
  FEISHU_SECRET: process.env.FEISHU_SECRET || '',
  PUSHPLUS_TOKEN: process.env.PUSHPLUS_TOKEN || ''
}
