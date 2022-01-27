const request = require('./request')

module.exports = function (cookie) {
  return {
    /**
     * 查询今日是否有免费抽奖机会
     * @returns Promise<any>
     */
    lottery_config: function () {
      return request({
        method: 'GET',
        url: 'https://api.juejin.cn/growth_api/v1/lottery_config/get',
        headers: {
          cookie
        }
      })
    },

    /**
     * 查询今日是否已经签到
     * @returns Promise<any>
     */
    get_today_status: function () {
      return request({
        method: 'GET',
        url: 'https://api.juejin.cn/growth_api/v1/get_today_status',
        headers: {
          cookie
        }
      })
    },

    /**
     * 签到
     * @returns Promise<any>
     */
    check_in: function () {
      return request({
        method: 'POST',
        url: 'https://api.juejin.cn/growth_api/v1/check_in',
        headers: {
          cookie
        }
      })
    },

    /**
     * 免费抽奖
     * @returns Promise<any>
     */
    draw: function () {
      return request({
        method: 'POST',
        url: 'https://api.juejin.cn/growth_api/v1/lottery/draw',
        headers: {
          cookie
        }
      })
    },

    /**
     * 可抽奖次数
     * @returns Promise<any>
     */
    get_cur_point: function () {
      return request({
        method: 'GET',
        url: 'https://api.juejin.cn/growth_api/v1/get_cur_point',
        headers: {
          cookie
        }
      })
    },

    /**
     * 获取沾喜气中奖列表
     * @returns Promise<any>
     */
    get_dip_lucky_list: function () {
      return request({
        method: 'POST',
        url: 'https://api.juejin.cn/growth_api/v1/lottery_history/global_big',
        headers: {
          cookie
        },
        data: { page_no: 1, page_size: 5 }
      })
    },

    /**
     * 沾喜气
     * @param {string | number} id
     * @returns Promise<any>
     */
    dip_lucky: function (id) {
      return request({
        method: 'POST',
        url: 'https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky',
        headers: {
          cookie
        },
        data: { lottery_history_id: id }
      })
    }
  }
}
