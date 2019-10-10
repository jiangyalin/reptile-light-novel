// 2.
// 拉取资源(详情)
const fs = require('fs')
const Crawler = require('crawler')
const convert = require('xml-js')

const bookInfo = fs.readFileSync('./files/bookInfo.json', 'utf8')

const node = [JSON.parse(bookInfo).node[0]]
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
    uri: item.href + '&page=2',
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
  fs.writeFileSync('./files/chapter/' + name + '.html', xml)
  const href = GetUpdatedList(JSON.parse(JSON.parse(node))) // xx列表
  chapter.push({
    title: name,
    href: href
  })
  // if (isEnd) {
  //   fs.writeFileSync('./files/test.json', JSON.stringify({
  //     tips: 'list',
  //     node: chapter
  //   }))
  // }
}

// 获取最新更新的xx列表（格式化后的xml的json结构）
const GetUpdatedList = json => {
  const dom = json.elements[1].elements[1].elements[0].elements.filter(item => item.name === 'a' && item.attributes)
  const chapterList = dom.filter(item => item.attributes.href.indexOf('readchapter.php?aid=') !== -1).map(item => {
    return {
      name: item.elements[0].text,
      href: item.attributes.href
    }
  })
  // console.log('json', chapterList)
  const totalPage = json.elements[1].elements[1].elements[0].elements.find(item => item.type === 'text' && item.text.indexOf('[') === 0 && item.text.indexOf('/') !== -1 && item.text.indexOf(']') === item.text.length)
  console.log('totalPage', totalPage)
  fs.writeFileSync('./files/test.json', JSON.stringify(json.elements[1].elements[1].elements[0]))
  return chapterList
}

crawler.queue(urls)