const request = require('./request')
const { AID, UUID } = require('./config')

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
    },

    /**
     * 收集bug
     * @param {*} bug_type 目前知道的类型
     * 10,9(表示当天定时生成的bug)
     * 7(表示昨天定时生成的bug)
     * @returns Promise<any>
     */
    collect_bugs: function (bug_type, day) {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth()
      return request({
        method: 'POST',
        url: `https://api.juejin.cn/user_api/v1/bugfix/collect?aid=${AID}&uuid=${UUID}&spider=0`,
        headers: {
          cookie
        },
        data: {
          bug_time: parseInt(new Date(year, month, day).getTime() / 1000),
          bug_type: bug_type
        }
      }).catch(err => {
        // console.log('err:', err)
      })
    }
  }
}
