const fs = require('fs')

module.exports = (info = {
  cover: '', // 封面图片路径
  title: '【魔法禁书目录】', // 标题*
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
    id: '',
    href: '',
    title: ''
  }]
}) => {
  let title = '<?xml version="1.0" encoding="UTF-8" ?>'
  let manifest = '<manifest>'
  manifest += '<item id="main-css" href="css/main.css" media-type="text/css"/>'
  info.list.forEach(item => {
    manifest += '<item id="' + item.id + '" href="' + item.href + '" media-type="application/xhtml+xml"/>'
  })
  manifest += '<item id="ncx"  href="fb.ncx" media-type="application/x-dtbncx+xml"/>'
  manifest += '<item id="css" href="css/main.css" media-type="text/css"/>'
  manifest += '<item id="cover-image" href="' + info.cover + '" media-type="image/jpeg"/>'
  manifest += '</manifest>'
  let spine = '<spine toc="ncx">'
  info.list.forEach(item => {
    spine += '<itemref idref="' + item.id + '" linear="yes"/>'
  })
  spine += '</spine>'
  const template = title + '<package version="2.0" unique-identifier="PrimaryID" xmlns="http://www.idpf.org/2007/opf">' +
    '  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">' +
    '    <dc:title>' + info.title + '</dc:title>\n' +
    '    <dc:identifier opf:scheme="ISBN">' + info.identifier + '</dc:identifier>' +
    '    <dc:language>' + info.language + '</dc:language>' +
    '    <dc:creator>' + info.creator + '</dc:creator>' +
    '    <dc:publisher>' + info.publisher + '</dc:publisher>' +
    '    <dc:description>' + info.description + '</dc:description>' +
    '    <dc:coverage>' + info.coverage + '</dc:coverage>' +
    '    <dc:source>' + info.source + '</dc:source>' +
    '    <dc:date>' + info.date + '</dc:date>' +
    '    <dc:rights>' + info.rights + '</dc:rights>' +
    '    <dc:subject>' + info.subject + '</dc:subject>' +
    '    <dc:contributor>' + info.contributor + '</dc:contributor>' +
    '    <dc:type>' + info.type + '</dc:type>' +
    '    <dc:format>' + info.format + '</dc:format>' +
    '    <dc:relation>' + info.relation + '</dc:relation>' +
    '    <dc:builder>' + info.builder + '</dc:builder>' +
    '    <dc:builder_version>' + info.builder_version + '</dc:builder_version>' +
    '    <meta name="cover" content="cover-image"/>' +
    '  </metadata>' + manifest + spine +
    '  <guide>' +
    '    <reference type="cover" title="封面"  href="' + info.cover + '"/>' +
    '  </guide>' +
    '</package>'
  fs.mkdirSync('./book/' + info.title + '/META-INF', { recursive: true })
  fs.mkdirSync('./book/' + info.title + '/OPS', { recursive: true })
  fs.writeFileSync('./book/' + info.title + '/OPS/fb.opf', template)
}