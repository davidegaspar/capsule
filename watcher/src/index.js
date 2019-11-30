#!/usr/bin/env node

const onoff = require('onoff')
const logger = require('./modules/logger')
const { setup } = require('./modules/utils')
const { logic } = require('./modules/logic')

// setup
let pir = new onoff.Gpio(15, 'in', 'both')
setup()

// main
pir.watch(logic)
logger.info('Ready.')
