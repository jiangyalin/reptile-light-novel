// 4.
// 拉取资源(内容)
const fs = require('fs')
const Crawler = require('crawler')
const convert = require('xml-js')

const updatedList = fs.readFileSync('./files/chapter.json', 'utf8')

const node = [JSON.parse(updatedList).node[0]]
const map = {}
node.forEach(item => map[item.href] = item.title)

let crawler = new Crawler({
  encoding: null, // 编码
  maxConnections: 5, // 最大并发请求数
  callback: (err, res, done) => {
    if (err) console.log(err)
    if (!err) console.log(res.options)
    done()
  }
})

const urls = []
node.forEach((item, i) => {
  let url = {
    uri: item.href,
    jQuery: true,

    callback: (err, res, done) => {
      if (err) console.log(err)
      if (!err) main(res, item.title, i === node.length - 1)
      done()
    }
  }
  urls.push(url)
})

const chapter = []

const main = (res, name, isEnd) => {
  const xml = res.body.toString()
  const json = convert.xml2json(xml, {compact: false, spaces: 4})
  const node = JSON.stringify(json) // 返回的结构
  fs.writeFileSync('./files/info/' + name + '.html', xml)
  const href = GetUpdatedList(JSON.parse(JSON.parse(node))) // xx列表
  chapter.push({
    title: name,
    href: href
  })
  if (isEnd) {
    fs.writeFileSync('./files/bookInfo.json', JSON.stringify({
      tips: '章节',
      node: chapter
    }))
  }
}

// 获取最新更新的xx列表（格式化后的xml的json结构）
const GetUpdatedList = json => {
  const newBook = json.elements[1].elements[1].elements[0].elements.find(item => item.elements && item.elements[0].text === '阅读该书')
  return 'http://www.wenku8.net/wap/article/' + newBook.attributes.href
}

crawler.queue(urls)