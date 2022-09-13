const request = require('./request')
const { UUID } = require('./config')

module.exports = function (cookie) {
  return {
    /**
     * 查询今日是否有免费抽奖机会
     * @returns Promise<any>
     */
    lottery_config: function () {
      return request({
        method: 'GET',
        url: 'https://api.juejin.cn/growth_api/v1/lottery_config/get?spider=0',
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
        url: 'https://api.juejin.cn/growth_api/v1/get_today_status?spider=0',
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
        url: 'https://api.juejin.cn/growth_api/v1/check_in?spider=0',
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
        url: 'https://api.juejin.cn/growth_api/v1/lottery/draw?spider=0',
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
        url: 'https://api.juejin.cn/growth_api/v1/get_cur_point?spider=0',
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
        url: 'https://api.juejin.cn/growth_api/v1/lottery_history/global_big?spider=0',
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
        url: 'https://api.juejin.cn/growth_api/v1/lottery_lucky/dip_lucky?spider=0',
        headers: {
          cookie
        },
        data: { lottery_history_id: id }
      })
    },

    /**
     * 未收集bug （生成bug）
     * @return [{ bug_type: 8,bug_time: 1661443200,bug_show_type: 1,is_first: true}]
     */
    not_collect: function () {
      return request({
        method: 'POST',
        url: `https://api.juejin.cn/user_api/v1/bugfix/not_collect?aid=2608&uuid=${UUID}&spider=0`,
        headers: {
          cookie
        },
        data: {}
      })
    },

    /**
     * 收集bug
     * @param {*} data
     *  data: {
     *  bug_time: 1661443200, (当天的时间 e:2020-01-01)
     *  bug_type: 10, 目前知道的类型 10,9,8(表示当天定时生成的bug) 7(表示昨天定时生成的bug)】
     *  }
     * @returns Promise<any>
     */
    collect_bugs: function (data) {
      return request({
        method: 'POST',
        url: `https://api.juejin.cn/user_api/v1/bugfix/collect?aid=2608&uuid=${UUID}&spider=0`,
        headers: {
          cookie
        },
        data
      }).catch(err => {
        // console.log('collect_bugs API err:', err)
      })
    },

    /**
     * 获取比赛id
     * @returns Promise<any>
     */
    getCompetition: function () {
      return request({
        method: 'POST',
        url: `https://api.juejin.cn/user_api/v1/bugfix/competition?aid=2608&uuid=${UUID}&spider=0`,
        headers: {
          cookie
        },
        data: {
          competition_id: ''
        }
      }).catch(err => {
        // console.log('getCompetition API err:', err)
      })
    },

    /**
     * bugfix用户信息
     * @returns Promise<any>
     */
    bugfix_user: function (data) {
      return request({
        method: 'POST',
        url: `https://api.juejin.cn/user_api/v1/bugfix/user?aid=2608&uuid=${UUID}&spider=0`,
        headers: {
          cookie
        },
        data
      }).catch(err => {
        // console.log('bugfix_user API err:', err)
      })
    },

    /**
     * fix bug接口
     * @returns Promise<any>
     */
    bugfix_fix: function (data) {
      return request({
        method: 'POST',
        url: `https://api.juejin.cn/user_api/v1/bugfix/fix?aid=2608&uuid=${UUID}&spider=0`,
        headers: {
          cookie
        },
        data
      }).catch(err => {
        // console.log('bugfix_fix API err:', err)
      })
    },

    /**
     * 评论接口
     * @param {*} data
     * @returns
     */
    comment: function (data) {
      return request({
        method: 'POST',
        url: `https://api.juejin.cn/interact_api/v1/comment/publish?aid=2608&uuid=${UUID}&spider=0`,
        headers: {
          cookie
        },
        data
      }).catch(err => {
        // console.log('comment API err:', err)
      })
    }
  }
}
