// 3.
// 拉取资源(章节)
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
    uri: item.href,
    jQuery: true,

    callback: (err, res, done) => {
      if (err) console.log(err)
      if (!err) getTotalPageMain(res, item)
      done()
    }
  }
  urls.push(url)
})

let total = 0 // 所有book的总页数
let thisEndPage = 0 // 当前完成页数
let chapter = []

const getTotalPageMain = (res, obj) => {
  const xml = res.body.toString()
  const json = convert.xml2json(xml, {compact: false, spaces: 4})
  const node = JSON.stringify(json) // 返回的结构
  const totalPage = GetTotalPage(JSON.parse(JSON.parse(node)))
  total += totalPage
  if (!chapter.find(item => item.title === obj.title)) {
    chapter.push({
      bookTitle: obj.title,
      node: new Array(totalPage)
    })
  }
  const crawlerPageUrls = GetCrawlerPageUrl(obj, totalPage)
  crawler.queue(crawlerPageUrls)
}

// 生成每页对象
const GetCrawlerPageUrl = (book, totalPage) => {
  const arr = []
  for (let i = 0; i < Number(totalPage); i++) {
    arr.push({
      uri: book.href + '&page=' + (i + 1),
      jQuery: true,
      callback: (err, res, done) => {
        if (err) console.log(err)
        if (!err) main(res, book, i + 1)
        done()
      }
    })
  }
  return arr
}

const main = (res, book, page) => {
  thisEndPage ++
  const xml = res.body.toString()
  const json = convert.xml2json(xml, {compact: false, spaces: 4})
  const node = JSON.stringify(json) // 返回的结构
  fs.writeFileSync('./files/content/' + book.title + ' ' + page + '.html', xml)
  const joint = GetUpdatedList(JSON.parse(JSON.parse(node))) // xx列表
  chapter = chapter.map(item => {
    let node = item.node
    if (item.bookTitle === book.title) {
      node[page - 1] = joint
    }
    return {
      ...item,
      node
    }
  })
  if (thisEndPage === total) {
    setTimeout(() => {
      chapter = chapter.map(item => {
        const node = []
        item.node.forEach(data => {
          data.forEach(arr => {
            node.push({
              ...arr,
              bookName: item.bookTitle
            })
          })
        })
        return {
          ...item,
          node
        }
      })
      fs.writeFileSync('./files/chapter.json', JSON.stringify({
        tips: '章节',
        node: chapter
      }))
    }, 1000)
  }
}

// 获取总页数
const GetTotalPage = json => {
  const text = (json.elements[1].elements[1].elements[0].elements
    .find(item => item.type === 'text' && item.text.indexOf('[') === 0 && item.text.indexOf(']') === item.text.length - 1) || {}).text
  return text ? Number(text.substring(text.indexOf('/') + 1, text.length - 1)) : 0
}

// 获取最新更新的xx列表（格式化后的xml的json结构）
const GetUpdatedList = json => {
  const dom = json.elements[1].elements[1].elements[0].elements.filter(item => item.name === 'a' && item.attributes)
  return dom.filter(item => item.attributes.href.indexOf('readchapter.php?aid=') !== -1).map(item => {
    let href = 'http://www.wenku8.net/wap/article/' + item.attributes.href
    if (item.elements[0].text === '插图') {
      href = 'https://www.wenku8.net/modules/article/reader.php?' + item.attributes.href.substring(item.attributes.href.indexOf('?') + 1)
    }
    return {
      name: item.elements[0].text,
      href
    }
  })
}

crawler.queue(urls)