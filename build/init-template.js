const fs = require('fs')

module.exports = callback => {
  fs.mkdirSync('./book/' + info.title + '/META-INF', { recursive: true })
  fs.mkdirSync('./book/' + info.title + '/OPS/css', { recursive: true })
  fs.mkdirSync('./book/' + info.title + '/OPS/images', { recursive: true })
  // fs.writeFileSync('./book/' + info.title + '/OPS/fb.opf', template)
  callback()
}