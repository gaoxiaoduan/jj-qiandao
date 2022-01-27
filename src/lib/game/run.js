const { USERID } = require('../config')

const { autoGame } = require('./autoGame')

function running() {
  if (!USERID) return
  autoGame()
  console.log('game running...')
}

running()
