// 5.
// 合并内容
const fs = require('fs')
const Crawler = require('crawler')
const moment = require('moment')
const toPathName = require('./utils/toPathName')
const filterStringPage = require('./utils/filterStringPage')

const word = JSON.parse(fs.readFileSync('./files/word.json', 'utf8'))
const wordPixiv = JSON.parse(fs.readFileSync('./files/wordPixiv.json', 'utf8')).filter((item, i) => i < 0)
const last = moment().unix()

let crawler = new Crawler({
  encoding: null, // 编码
  maxConnections: 10, // 最大并发请求数
  callback: (err, res, done) => {
    if (err) console.log(err)
    if (!err) fs.createWriteStream(res.options.filename).write(res.body)
    done()
  }
})

const urls = []
wordPixiv.forEach((data, i) => { // book
  data.node.forEach(item => { // 章
    let url = {
      uri: item.src,
      jQuery: false,
      callback: (err, res, done) => {
        if (err) console.log(err)
        if (!err) main(res, data.bookName, i + 1, item.sn)
        done()
      }
    }
    urls.push(url)
  })
})

word.forEach(item => {
  let text = item.bookName + '\r\n'
  item.node.forEach((node, i) => {
    if (node) {
      const _txt = node.jointName + '\r\n' + node.node.map(item => filterStringPage(item)).join('')
      // fs.writeFileSync('./files/txt/' + node.jointName + '.txt', _txt) // 记录分页内容
      text += _txt
      if (i === 0) {
        // console.log('_txt', _txt)
        // console.log('bb')
        // console.log('_txt', _txt)
        // console.log('aa')
      }
    }
  })
  fs.writeFileSync('./files/word/' + toPathName(item.bookName) + '.txt', text)
})

wordPixiv.forEach(item => {
  fs.mkdirSync('./files/word/' + toPathName(item.bookName + ' - 插图'), { recursive: true })
})

const main = (res, bookName, serialNumber, sn) => {
  fs.writeFileSync('./files/word/' + toPathName(bookName + ' - 插图') + '/' + toPathName(bookName + '第' + serialNumber + '卷 ' + sn + '.jpg'), res.body)
  console.log('总计用时：' + (moment().unix() - last) + 's')
}

crawler.queue(urls)