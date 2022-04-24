const {
  COOKIE,
  ALL_IN,
  USERID,
  AUTO_CHECK_IN,
  AID,
  UUID
} = require('./lib/config')
const message = require('./lib/message')

if (!COOKIE) return message('获取不到cookie，请检查设置')

const { autoGame } = require('./lib/game/autoGame')

const api = require('./lib/api')(COOKIE)

// 获取可抽奖次数
async function get_raw_time() {
  const res = await api.get_cur_point()
  return Math.floor(res / 200)
}

// 抽奖一次
async function draw() {
  const res = await api.draw()
  const { lottery_name } = res
  message(`抽奖成功，获得: ${lottery_name}`)
  return res
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
    let day = new Date().getDate()
    let typeArray = [14, 13, 12, 11, 10, 9, 8, 7]
    const todayArray = typeArray.map(item => api.collect_bugs(item, day))
    const yesterdayArray = typeArray.map(item =>
      api.collect_bugs(item, day - 1)
    )
    const todayResArray = await Promise.allSettled(todayArray)
    const yesterdayResArray = await Promise.allSettled(yesterdayArray)
    // console.log('[ todayResArray ] >', todayResArray)
    // console.log('[ yesterdayResArray ] >', yesterdayResArray)
    const filterSuccessResult = resArray => {
      resArray
        .filter(item => item.status === 'fulfilled' && Boolean(item.value))
        .forEach(_ => count++)
    }
    todayResArray && filterSuccessResult(todayResArray)
    yesterdayResArray && filterSuccessResult(yesterdayResArray)
  } catch (error) {
    // console.log('error::', error)
  } finally {
    return count
  }
}

;(async () => {
  // 查询今日是否已经签到
  const today_status = await api.get_today_status()
  if (today_status) {
    message('今日已经签到!')
    // 查询今日是否有免费抽奖机会
    const { free_count } = await api.lottery_config()
    if (free_count === 0) return message('今日已经免费抽奖!')
    // 去抽奖
    ALL_IN === 'true' ? await draw_all() : await draw()
    return
  }
  if (AUTO_CHECK_IN) {
    // 签到并抽奖
    api.check_in().then(({ sum_point }) => {
      message(`签到成功!当前积分: ${sum_point}`)
      // 去抽奖
      ALL_IN === 'true' ? draw_all() : draw()
    })
  } else {
    // 仅抽奖
    ALL_IN === 'true' ? draw_all() : draw()
  }

  const dipMsg = await dipLucky() // 粘喜气
  message(dipMsg)

  if (!USERID) return message('获取不到uid，请检查设置')
  autoGame()
  message('游戏运行中...')

  if (!AID) return message('获取不到AID，请检查设置')
  if (!UUID) return message('获取不到UUID，请检查设置')
  const bugCount = await collectBug() // 收集bug
  bugCount === 0
    ? message('今日没有收集到bug')
    : message(`成功,收集到${bugCount}个bug`)
})()
