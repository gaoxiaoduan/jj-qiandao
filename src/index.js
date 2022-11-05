const {
  COOKIE,
  ALL_IN,
  USERID,
  AUTO_CHECK_IN,
  UUID,
  SKIP_DRAW,
  COMMITID,
  COMMITTYPE,
  ASSIST_USER_ID,
  ASSIST_DAY
} = require('./lib/config')
const message = require('./lib/message')

if (!COOKIE) return message('获取不到cookie,请检查设置')

const { autoGame } = require('./lib/game/autoGame')

const api = require('./lib/api')(COOKIE)
const { randomEmoji, sleep } = require('./lib/utils')

// 获取可抽奖次数
async function get_raw_time() {
  const res = await api.get_cur_point()
  return Math.floor(res / 200)
}

// 抽奖一次
async function draw() {
  try {
    if (SKIP_DRAW) return null // 跳过抽奖
    const res = await api.draw()
    const { lottery_name } = res
    message(`抽奖成功，获得: ${lottery_name}`)
    return res
  } catch (error) {
    console.log(error)
  }
}

// 抽所有
async function draw_all() {
  const time = await get_raw_time()
  message(`梭哈, 可抽奖次数${time}`)
  if (!time) {
    message(`抽奖完成`)
  }

  for (let i = 0; i < time; i++) {
    await draw()
  }

  if (await get_raw_time()) {
    await draw_all()
  }
}

// 粘喜气
async function dipLucky() {
  const RANDOM_NUMBER = Math.floor(Math.random() * 5)
  const { lotteries } = await api.get_dip_lucky_list()
  const DIP_LUCKY_ID = lotteries?.[RANDOM_NUMBER]?.history_id ?? 0

  const { has_dip, dip_action, total_value } = await api.dip_lucky(DIP_LUCKY_ID)

  const BeamingValue = `当前喜气值: ${total_value}`

  if (has_dip) return `今日已沾过喜气, ${BeamingValue}`

  if (dip_action === 1) return `沾喜气成功! ${BeamingValue}`
}

// 收集bug
async function collectBug() {
  let count = 0 // 成功收集bug数
  try {
    const res = await api.not_collect()
    const notCollectResult = res || [] // 未收集的bug
    if (notCollectResult?.length === 0) return count

    const notCollectResultArrayApi = notCollectResult.map(item =>
      api.collect_bugs(item)
    )
    const collectResArray = await Promise.allSettled(notCollectResultArrayApi)
    const countSuccessResult = resArray => {
      return resArray
        .filter(item => item.status === 'fulfilled' && item.value !== undefined)
        .forEach(_ => count++)
    }
    collectResArray && countSuccessResult(collectResArray)
  } catch (error) {
    // console.log('error::', error)
  } finally {
    return count
  }
}

// 评论
async function commit() {
  try {
    if (!COMMITID) return message('获取不到commitID,请检查设置')
    let comment_content = ''
    for (let i = 0; i < 3; i++) {
      comment_content += randomEmoji()
    }
    const params = {
      item_id: COMMITID, // 沸点id
      item_type: COMMITTYPE ? 4 : 2, // 评论类型 2为文章 4为沸点(默认)
      comment_content,
      comment_pics: [],
      client_type: 2608 // 2608是浏览器
    }
    const res = await api.comment(params)
    message(`评论成功📢📢📢`)
  } catch (error) {
    console.log('commit error::', error)
  }
}

// 自动助力
async function autoHelp(competition_id, bug_fix_num = 1) {
  try {
    // if (!ASSIST_USER_ID) return message('获取不到assist_user_id,如需开启请设置')
    if (!competition_id) return message('获取不到competition_id')
    const params = {
      competition_id, // 比赛ID
      bug_fix_num, // 助力bug数量
      // assist_user_id: ASSIST_USER_ID, // 助力目标ID
      not_self: 0
    }
    const res = await api.bugfix_fix(params)
    console.log('助力接口:::', res)
    if (!res) return message('助力失败')
    message(
      `成功助力,目标名次:${res?.user_rank || -1},目标bug数量:${res?.bug_fix_num || -1
      }`
    )
  } catch (error) {
    console.log('autoHelp error::', error)
  }
}

; (async () => {
  // 查询今日是否已经签到
  const today_status = await api.get_today_status()
  let freeCount = 3 // 免费签到次数
  if (today_status) {
    message('今日已经签到!')
    // 查询今日是否有免费抽奖机会
    const { free_count } = await api.lottery_config()
    freeCount = free_count
    if (free_count === 0) message('今日已经免费抽奖!')
    // 去抽奖
    if (ALL_IN === 'true' || freeCount !== 0) {
      ALL_IN === 'true' ? await draw_all() : await draw()
    }
  }
  await null // 将下面的任务放到下一个循环中执行
  if (AUTO_CHECK_IN) {
    // 签到并抽奖
    if (freeCount !== 0) {
      api.check_in().then(({ sum_point }) => {
        message(`签到成功!当前积分: ${sum_point}`)
        // 去抽奖
        ALL_IN === 'true' ? draw_all() : draw()
      }).catch(() => { })
    }
  } else {
    // 仅抽奖
    ALL_IN === 'true' ? draw_all() : draw()
  }

  const dipMsg = await dipLucky() // 粘喜气
  message(dipMsg)

  // -------------------评论沸点-------------------
  if (new Date().getDay() === 5) {
    // 周五进行评论
    commit()
  }

  // -------------------游戏收集-------------------
  if (!USERID) return message('获取不到uid,请检查设置')
  autoGame()
  message('游戏运行中...')

  // -------------------收集bug-------------------
  if (!UUID) return message('获取不到UUID,请检查设置')
  const bugCount = await collectBug() // 收集bug
  const { competition_id } = await api.getCompetition()
  const { user_own_bug } = await api.bugfix_user({ competition_id })
  bugCount === 0
    ? message(`💬 没有收集到bug~,目前bug数量:${user_own_bug}`)
    : message(`🎉 收集到${bugCount}个bug,目前bug数量:${user_own_bug}`)

  // -------------------自动助力-------------------
  const nowDate = new Date()
  if (nowDate.getDay().toString() === ASSIST_DAY) {
    const nowHours = nowDate.getHours()
    if (nowHours !== 10) return message(`助力尚未开始:当前时间${nowHours}`)
    message('💬💬💬 15s后自动助力~')
    await sleep(1000 * 15)
    autoHelp(competition_id, user_own_bug)
  }
})()
