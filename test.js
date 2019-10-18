const fs = require("fs");

// fs.readFile('./files/index.json', function (err, stats) {
//     console.log(JSON.parse(stats.toString()).elements[1].elements[2].elements[1].elements[46]);
// });
let tt = './files/Hero...? 2.html'
// tt = tt.replace(/</g, '(')
// tt = tt.replace(/>/g, ')')
// tt = tt.replace(/\//g, ')')
tt = tt.replace(/\?/g, ')')
console.log('rr', tt)
// fs.writeFileSync(tt, 'xml') // 记录内容页

new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('a')
    resolve('aa')
  }, 3000)
}).then(res => {
  console.log('res2', res)
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // console.log('dd')
      resolve('hh')
    }, 3000)
  })
}).then(res => {
  console.log('res3', res)
  return 'ccc'
}).catch(err => {
  console.log('err', err)
})

// const b = new Promise(() => {
//   setTimeout((resolve, reject) => {
//     console.log('b')
//     resolve('bb')
//   }, 3000)
// })
//
// const c = new Promise(() => {
//   setTimeout((resolve, reject) => {
//     console.log('c')
//     resolve('cc')
//   }, 3000)
// })
//
// a.then(res => {
//   return true
// }).then(res => {
//   console.log('res', res)
//   return true
// }).then(res => {
//   console.log('res', res)
//   return true
// })