module.exports = {
  COOKIE:
    process.env.COOKIE ||
    'MONITOR_WEB_ID=09715050-b322-4015-b28e-aed0105727be; passport_csrf_token_default=9a58fb9f7e746ee1ee64c9ca4fd006ef; passport_csrf_token=9a58fb9f7e746ee1ee64c9ca4fd006ef; sid_guard=87d5b368ad4db35d560b5ec67f7985c4%7C1641521111%7C5184000%7CTue%2C+08-Mar-2022+02%3A05%3A11+GMT; uid_tt=70e8464b287dcbcec19fc1c17e1b3b44; uid_tt_ss=70e8464b287dcbcec19fc1c17e1b3b44; sid_tt=87d5b368ad4db35d560b5ec67f7985c4; sessionid=87d5b368ad4db35d560b5ec67f7985c4; sessionid_ss=87d5b368ad4db35d560b5ec67f7985c4; sid_ucp_v1=1.0.0-KGYzOTYyYjc0MDBlYjhlODZkZThjY2U1ZDNjZGNlZjFhNDRmNTA0MWUKFgiO2YChrvSbARDXv96OBhiwFDgIQDgaAmxmIiA4N2Q1YjM2OGFkNGRiMzVkNTYwYjVlYzY3Zjc5ODVjNA; ssid_ucp_v1=1.0.0-KGYzOTYyYjc0MDBlYjhlODZkZThjY2U1ZDNjZGNlZjFhNDRmNTA0MWUKFgiO2YChrvSbARDXv96OBhiwFDgIQDgaAmxmIiA4N2Q1YjM2OGFkNGRiMzVkNTYwYjVlYzY3Zjc5ODVjNA; n_mh=paWcY6RxpMcma-EjZcHhjqWPxi9dHiZkoXXSKke00ns; _tea_utm_cache_2608={%22utm_source%22:%22gold_browser_extension%22}',
  // 自动玩游戏需要此参数，在掘金首页打开控制台输入这行代码`window.__NUXT__.state.auth.user.id`就可以得到
  USERID: process.env.USERID || '685695356120206',
  DINGTALK_WEBHOOK: process.env.DINGTALK_WEBHOOK || '',
  DINGTALK_SECRET: process.env.DINGTALK_SECRET || '',
  ALL_IN: process.env.ALL_IN || '',
  WX_COMPANY_ID: process.env.WX_COMPANY_ID || '', // 企业 ID
  WX_APP_ID: process.env.WX_APP_ID || '', // 应用 ID
  WX_APP_SECRET: process.env.WX_APP_SECRET || '', // 应用 secret
  FEISHU_WEBHOOK: process.env.FEISHU_WEBHOOK || '',
  FEISHU_SECRET: process.env.FEISHU_SECRET || ''
}
