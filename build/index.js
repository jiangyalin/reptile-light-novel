const fs = require('fs')
const path = require('path')
const JSZip = require('jszip')
const initTemplate = require('./init-template')
const createOpfTemplate = require('./create-opf-template')
const createNcxTemplate = require('./create-ncx-template')

const zip = new JSZip()

const info = {
  cover: 'images/微信截图_20191018140021.png', // 封面图片路径
  title: 'xx', // 标题*
  identifier: '', // 标识信息
  language: 'zh-CN', // 语言*
  creator: '某某某', // 责任人(作者)*
  publisher: '集英社', // 出版者
  description: '', // 内容描述
  coverage: '', // 覆盖范围
  source: 'http://www.jiangyalin.com', // 来源信息*
  date: '2013-03-05', // 日期*
  rights: '仅供交流使用，未经授权，不得用于商业用途', // 权限描述*
  subject: '轻小说', // 主题词或关键词*
  contributor: '', // 发行者
  type: '', // 类型*
  format: '', // 格式
  relation: '', // 相关资料
  builder: 'epubBuilder',
  builder_version: '2.0',
  list: [{
    id: 'chapter7',
    href: 'chapter7.html',
    title: 'chapter7'
  }]
}

initTemplate(info.title, () => {
  createOpfTemplate(info)
  createNcxTemplate(info)
})

const readFileList = (dir, filesList = []) => {
  const files = fs.readdirSync(dir)
  files.forEach(item => {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item), filesList) // 递归读取文件
    } else {
      filesList.push({
        fullPath,
        name: item
      })
    }
  })
  return filesList
}

const filesList = readFileList(__dirname + '/book/' + info.title)

filesList.forEach(item => {
  const _path = item.fullPath.substring(item.fullPath.indexOf(info.title) + info.title.length + 1)
  console.log('_path', _path)
  zip.file(_path, fs.readFileSync(item.fullPath, { encoding: 'utf-8' }))
})

zip.generateNodeStream({
  type: 'nodebuffer',
  streamFiles: true
}).pipe(fs.createWriteStream('out.epub'))
  .on('finish', () => {
    console.log("out.zip written.")
  })

zip.generateNodeStream({
  type: 'nodebuffer',
  streamFiles: true
}).pipe(fs.createWriteStream('out.zip'))
  .on('finish', () => {
    console.log("out.zip written.")
  })