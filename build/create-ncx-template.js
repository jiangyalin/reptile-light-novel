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
  let title = '<?xml version="1.0" encoding="UTF-8"?>' + '<!DOCTYPE ncx PUBLIC "-//NISO//DTD ncx 2005-1//EN" "http://www.daisy.org/z3986/2005/ncx-2005-1.dtd">'
  let navMap = '<navMap>'
  info.list.forEach(item => {
    navMap += '<navPoint id="' + item.id + '" playOrder="7">' +
      '<navLabel><text>' + item.title + '</text></navLabel>' +
      '<content src="' + info.title + '"/>' +
      '</navPoint>'
  })
  navMap += '</navMap>'
  const template = title + '<ncx version="2005-1" xml:lang="en-US" xmlns="http://www.daisy.org/z3986/2005/ncx/">' +
    '  <head>' +
    '    <meta name="dtb:uid" content="51037e82-03ff-11dd-9fbb-0018f369440e"/>' +
    '    <meta name="dtb:depth" content="1"/>' +
    '    <meta name="dtb:totalPageCount" content="0"/>' +
    '    <meta name="dtb:maxPageNumber" content="0"/>' +
    '    <meta name="provider" content="www.cnepub.com"/>' +
    '    <meta name="builder" content="epubBuilder present by www.cnepub.com"/>' +
    '    <meta name="right" content="' + info.rights + '"/>' +
    '  </head>' +
    '<docTitle><text>' + info.title + '</text></docTitle>' +
    '<docAuthor><text>' + info.creator + '</text></docAuthor>' + navMap +
    '</ncx>'
  fs.mkdirSync('./book/' + info.title + '/META-INF', { recursive: true })
  fs.mkdirSync('./book/' + info.title + '/OPS', { recursive: true })
  fs.writeFileSync('./book/' + info.title + '/OPS/fb.ncx', template)
}