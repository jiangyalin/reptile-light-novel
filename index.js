// 主文件
const moment = require('moment')
const server = require('./server')
const bookInfo = require('./bookInfo')
const chapter = require('./chapter')
const content = require('./content')
const word = require('./word')
const last = moment().unix()

new Promise((resolve, reject) => {
  server(() => {
    console.log('第一步完成')
    console.log('用时：' + (moment().unix() - last) + 's')
    resolve('11')
  })
}).then(res => {
  return new Promise((resolve, reject) => {
    bookInfo(() => {
      console.log('第二步完成')
      console.log('用时：' + (moment().unix() - last) + 's')
      resolve('22')
    })
  })
}).then(rse => {
  return new Promise((resolve, reject) => {
    chapter(() => {
      console.log('第三步完成')
      console.log('用时：' + (moment().unix() - last) + 's')
      resolve('33')
    })
  })
}).then(rse => {
  return new Promise((resolve, reject) => {
    content(() => {
      console.log('第四步完成')
      console.log('用时：' + (moment().unix() - last) + 's')
      resolve('44')
    })
  })
}).then(rse => {
  console.log('res', res)
  word()
})
// server(() => {
//   console.log('第一步完成')
//   console.log('用时：' + (moment().unix() - last) + 's')
//   bookInfo(() => {
//     console.log('第二步完成')
//     console.log('用时：' + (moment().unix() - last) + 's')
//     chapter(() => {
//       console.log('第三步完成')
//       console.log('用时：' + (moment().unix() - last) + 's')
//       content(() => {
//         console.log('第四步完成')
//         console.log('用时：' + (moment().unix() - last) + 's')
//         word()
//       })
//     })
//   })
// })