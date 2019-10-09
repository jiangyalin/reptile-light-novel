// 2.
// 拉取资源(详情)
const fs = require('fs')
const Crawler = require('crawler')
const convert = require('xml-js')

const updatedList = fs.readFileSync('./files/updatedList.json', 'utf8')

// const GetUpdatedUrls = updatedList => updatedList.node.map(item => item.href)

const urls = JSON.parse(updatedList).node
console.log('urls', urls)

let crawler = new Crawler({
  encoding: null, // 编码
  maxConnections: 5, // 最大并发请求数
  callback: (err, res, done) => {
    if (err) console.log(err)
    if (!err) {
      console.log(res.options)
      // fs.createWriteStream(res.options.filename).write(res.body)
    }
    done()
  }
})

urls.forEach(item => {
  console.log('item.href', item.href)
  let url = {
    uri: item.href,
    jQuery: true,

    callback: (err, res, done) => {
      if (err) console.log(err)
      if (!err) main(res, item.title)
      done()
    }
  }
  urls.push(url)
})

const main = (res, name) => {
  console.log('name', name)
  const xml = res.body.toString()
  const json = convert.xml2json(xml, { compact: false, spaces: 4 })
  const node = JSON.stringify(json) // 返回的结构
  fs.writeFileSync('./files/info/index.html', xml)
}

// // 获取最新更新的xx列表（格式化后的xml的json结构）
// const GetUpdatedList = json => {
//     let node = [];
//     const newBook = json.elements[1].elements[2].elements[1];
//     for (let i = 0; i < 6; i++) {
//         const a = newBook.elements[(46 + i * 2)];
//         node.push({
//             title: a.elements[0].text,
//             href: a.attributes.href
//         })
//     }
//     return {
//         tips: '更新的轻小说列表',
//         node: node
//     }
// };
//
// const GetUpdatedUrls = updatedList => {
//     return updatedList.node.map(data => {
//         return data.href;
//     });
// };

crawler.queue(urls)