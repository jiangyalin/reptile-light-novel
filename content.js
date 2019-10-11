// 4.
// 拉取资源(内容)
const fs = require('fs')
const Crawler = require('crawler')
const convert = require('xml-js')

const updatedList = fs.readFileSync('./files/chapter.json', 'utf8')

// const node = JSON.parse(updatedList).node
const node = [{
  bookTitle: '这个勇者明明超TUEEE却过度谨慎',
  node: [JSON.parse(updatedList).node[0].node[30]]
}]
let word = []

word = node.map(item => {
  return {
    bookName: item.bookTitle,
    node: new Array(item.node.length)
  }
})

const crawler = new Crawler({
  encoding: null, // 编码
  maxConnections: 10, // 最大并发请求数
  callback: (err, res, done) => {
    if (err) console.log(err)
    if (!err) console.log(res.options)
    done()
  }
})

const urls = []
node.forEach(data => { // book
  data.node.forEach((item, i) => { // 章
    let url = {
      uri: item.href,
      jQuery: true,
      callback: (err, res, done) => {
        if (err) console.log(err)
        if (!err) getTotalPageMain(res, i + 1, item)
        done()
      }
    }
    urls.push(url)
  })
})

let total = 0 // 所有book的总页数
let thisEndPage = 0 // 当前完成页数
let chapter = []

const getTotalPageMain = (res, serialNumber, joint) => {
  const xml = res.body.toString()
  // console.log('xml', xml)
  let json = {}
  let node = {}
  let totalPage = 1
  if (joint.name !== '插图') {
    json = convert.xml2json(xml, {compact: false, spaces: 4})
    node = JSON.stringify(json) // 返回的结构
    totalPage = GetTotalPage(JSON.parse(JSON.parse(node)))
  }
  total += totalPage
  if (!chapter.find(item => item.name === joint.name)) {
    chapter.push({
      bookTitle: joint.name,
      node: new Array(totalPage)
    })
  }
  const crawlerPageUrls = GetCrawlerPageUrl(serialNumber, joint, totalPage)
  crawler.queue(crawlerPageUrls)
}

// 生成每页对象
const GetCrawlerPageUrl = (serialNumber, joint, totalPage) => {
  const arr = []
  for (let i = 0; i < Number(totalPage); i++) {
    arr.push({
      uri: joint.href + '&page=' + (i + 1),
      jQuery: true,
      callback: (err, res, done) => {
        if (err) console.log(err)
        if (!err) main(res, serialNumber, joint, totalPage, i + 1)
        done()
      }
    })
  }
  return arr
}

const main = (res, serialNumber, joint, totalPage, page) => {
  thisEndPage ++
  const xml = res.body.toString()
  let json = {}
  let node = {}
  let txtGroup = []
  let txt = ''
  let $ = ''
  if (joint.name !== '插图') {
    json = convert.xml2json(xml, {compact: false, spaces: 4})
    node = JSON.stringify(json) // 返回的结构
    txtGroup = GetContentTxtGroup(JSON.parse(JSON.parse(node))) // 分页
    txt = TxtGroupToContent(txtGroup)
  } else {
    $ = res.$
    // const imgLength = $('#content').find('img').length
    console.log('$', $('#content').find('img')[0].attribs.src)
  }
  fs.writeFileSync('./files/text/' + joint.name + ' ' + page + '.html', xml) // 记录内容页
  // const imgGroup = GetContentImgGroup(JSON.parse(JSON.parse(node))) // 插画
  // if (joint.name === '插图') {
  //
  // }
  // joint.bookName
  // serialNumber 节序号
  // joint.name // 节名
  // totalPage // 总页
  // page 页
  word = word.map(item => {
    const node = item.node
    if (joint.bookName === item.bookName) {
      if (!node[serialNumber - 1]) {
        node[serialNumber - 1] = {
          jointName: joint.name,
          serialNumber: serialNumber - 1,
          node: new Array(totalPage)
        }
      }
      node[serialNumber - 1].node[page - 1] = txt
    }
    return {
      ...item,
      node
    }
  })
  if (thisEndPage === total) {
    console.log('word', JSON.stringify(word))
    word.forEach(item => {
      item.node.forEach(node => {
        const _txt = node.node.join('\r\n')
        fs.writeFileSync('./files/txt/' + node.jointName + '.txt', _txt) // 记录分页内容
      })
    })
  }
}

// 获取总页数
const GetTotalPage = json => {
  const text = (json.elements[1].elements[1].elements[0].elements
    .find(item => item.type === 'text' && item.text.indexOf('[') === 0 && item.text.indexOf(']') === item.text.length - 1) || {}).text
  return text ? Number(text.substring(text.indexOf('/') + 1, text.length - 1)) : 0
}

// 获取内容节点
const GetContentTxtGroup = json => {
  let observationEnd = false // 是否观测到结束标记
  return json.elements[1].elements[1].elements[0].elements.filter(item => {
    if (item.type === 'text') {
      const isMarkNode = (item.text.indexOf('[') === 0 && item.text.indexOf(']') === item.text.length - 1)
      if (isMarkNode && !observationEnd) {
        observationEnd = true
      } else if (isMarkNode && observationEnd) {
        observationEnd = false
      }
    }
    return item.type === 'text' && observationEnd
  })
}

// 获取图片
const GetContentImgGroup = json => {
  console.log('json.elements[1].elements[1].elements[0].elements', json.elements[1].elements[1].elements[0].elements)
}

// 将内容节点转化为内容
const TxtGroupToContent = group => {
  let text = ''
  group.forEach(item => {
    text += item.text
  })
  return text
}

crawler.queue(urls)