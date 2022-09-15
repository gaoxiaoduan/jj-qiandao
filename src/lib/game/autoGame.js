const NAGETIVE_DIRECTION = {
  U: 'D',
  L: 'R',
  D: 'U',
  R: 'L'
}
const COLUMN = 6
const OBSTACLE = 6
const { COOKIE: cookie, USERID: uid } = require('../config')
const { Game } = require('./Game')

/**
 * @desc 一维数组转二维数组
 * @param {Array} arr 原数据
 * @param {Number} num 每个维度的元素数量
 */
function ArrayOneToTwo(arr, num) {
  let arrList = []
  arr.map((item, index) => {
    if (index % num == 0) {
      arrList.push([item])
    } else {
      arrList[arrList.length - 1].push(item)
    }
  })
  return arrList
}

/**
 * @desc 计算行走轨迹
 * @param {Array} maps 地图
 */
const getTarck = maps => {
  const mapsTrack = [
    [3, 1, 'U'],
    [2, 2, 'L'],
    [4, 2, 'D'],
    [3, 3, 'R']
  ]
  const mapsTree = ArrayOneToTwo(maps, COLUMN)

  // 过滤掉有障碍物的位置
  const trackXY = mapsTrack.filter(item => {
    const xy = mapsTree[item[0]][item[1]]
    return xy !== OBSTACLE
  })

  // 移动后反方向移动回初始位置
  const trackList = trackXY
    .map(item => {
      return [item[2], NAGETIVE_DIRECTION[item[2]]]
    })
    .flat()
  return trackList
}

let runNum = 0
// let errorCalled = false // 报错后，尝试再次执行
const autoGame = async () => {
  try {
    runNum++
    if (runNum > 500) return // 防止死循环
    let exp = new Game(uid, cookie)
    let gameData = await exp.openGame()
    console.log(gameData !== undefined ? 'Game Start🎮' : 'Game Start Error❌')
    if (!gameData) return

    const { mapData } = gameData
    const track = getTarck(mapData)
    exp.move(track).then(() => {
      exp.outGame().then(async res => {
        res.body = JSON.parse(res.body)
        console.log(
          `Game over, Reward: ${res.body.data.realDiamond}, Today reward: ${res.body.data.todayDiamond}, Today limit reward: ${res.body.data.todayLimitDiamond}`
        )
        console.log('6s后开始下一轮游戏🎮,请稍等～')
        if (res.body.data.realDiamond < 40) {
          // 奖励小于40刷新下地图
          await exp.freshMap()
        }
        // 没达到今日上限继续自动游戏
        if (res.body.data.todayDiamond < res.body.data.todayLimitDiamond) {
          setTimeout(() => {
            autoGame()
          }, 1000 * 6) // 设置6s执行一次，防止接口调用太过频繁，服务器报500的错
        } else {
          console.log('今日奖励已达上限！')
          // 若到达今日限制，脚本停止，若服务器500错误，则等待66s，再次执行脚本
          return
        }
      })
    })
  } catch (e) {
    console.log('捕获到错误 => ', e)
    // if (errorCalled) return
    console.log('66s后尝试再次执行🎮~')
    setTimeout(() => {
      // errorCalled = true
      autoGame()
    }, 1000 * 66)
  }
}

exports.autoGame = autoGame
