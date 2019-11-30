#!/usr/bin/env node
const { logic } = require('./modules/logic')

//mock: startRecording
setTimeout(() => {
  actionInProgress = false
  logger.info('Recording done.')
}, 10000)

// test: logic
logic(null, 1)
setTimeout(() => {
  console.log(2000);
  logic(null, 1)
}, 2000)
setTimeout(() => {
  console.log(4000);
  logic(null, 1)
}, 4000)
setTimeout(() => {
  console.log(6000);
  logic(null, 1)
}, 6000)
setTimeout(() => {
  console.log(8000);
  logic(null, 1)
}, 8000)
setTimeout(() => {
  console.log(10000);
  logic(null, 1)
}, 10000)
setTimeout(() => {
  console.log(12000);
  logic(null, 1)
}, 12000)
setTimeout(() => {
  console.log(14000);
  logic(null, 1)
}, 14000)
setTimeout(() => {
  console.log(16000);
  logic(null, 1)
}, 16000)
