// 1.
// 拉取资源
const fs = require('fs')
const Crawler = require('crawler')
const convert = require('xml-js')
const config = require('./config')

module.exports = (callback = () => {}) => {
  let crawler = new Crawler({
    encoding: null, // 编码
    maxConnections: 10, // 最大并发请求数
    callback: (err, res, done) => {
      if (err) console.log(err)
      if (!err) fs.createWriteStream(res.options.filename).write(res.body)
      done()
    }
  })

  let urls = []
  config.url.forEach(data => {
    let url = {
      uri: data.href,
      jQuery: false,

      callback: (err, res, done) => {
        if (err) console.log(err)
        if (!err) main(res, data.type)
        done()
      }
    }
    urls.push(url)
  })

  const main = (res, type) => {
    const xml = res.body.toString()
    const json = convert.xml2json(xml, {compact: false, spaces: 4})
    const node = JSON.stringify(json) // 返回的结构
    fs.writeFileSync('./files/index.html', xml) // 记录xml
    fs.writeFileSync('./files/index.json', json) // json化
    const updatedList = GetUpdatedList(JSON.parse(JSON.parse(node)), type) // xx列表
    fs.writeFileSync('./files/updatedList.json', JSON.stringify(updatedList)) // 写入后去的更新信息
    callback()
    console.log('aaa')
  }

  // 获取最新更新的xx列表（格式化后的xml的json结构）
  const GetUpdatedList = (json, type) => {
    let newBook = []
    if (type === 'new') {
      newBook = json.elements[1].elements[1].elements[0].elements.filter(item => item.name === 'a' && !item.attributes.title && item.attributes.href.indexOf('articleinfo.php?') !== -1)
    } else if (type === 'home') {
      newBook = json.elements[1].elements[2].elements[1].elements.filter(item => item.name === 'a' && !item.attributes.title && item.attributes.href.indexOf('http://www.wenku8.net/wap/article/articleinfo.php?') !== -1)
    }
    const node = newBook.map(item => {
      return {
        title: item.elements[0].text,
        href: type === 'home' ? item.attributes.href : 'http://www.wenku8.net/wap/article/' + item.attributes.href
      }
    })
    return {
      tips: '更新的xx列表',
      node: node
    }
  }

  crawler.queue(urls)
}