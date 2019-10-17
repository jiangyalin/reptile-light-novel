const createOpfTemplate = require('./create-opf-template')
const createNcxTemplate = require('./create-ncx-template')

const info = {
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
}

createOpfTemplate(info)
createNcxTemplate(info)