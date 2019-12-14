#!/usr/bin/env node

const onoff = require('onoff')
const logger = require('./modules/logger')
const record = require('./modules/record')
const ping = require('./modules/ping')
const { logic, configPull } = require('./modules/logic')

// setup
let pir = new onoff.Gpio(15, 'in', 'both')
record.setup()
ping.start()
configPull()

// main
pir.watch(logic)
logger.info('Ready.')
