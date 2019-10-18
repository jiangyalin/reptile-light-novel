const fs = require('fs')

module.exports = (title, callback) => {
  fs.mkdirSync('./book/' + title + '/META-INF', { recursive: true })
  fs.mkdirSync('./book/' + title + '/OPS/css', { recursive: true })
  fs.mkdirSync('./book/' + title + '/OPS/images', { recursive: true })
  fs.writeFileSync('./book/' + title + '/OPS/css/main.css', fs.readFileSync('./template/main.css', 'utf8'))
  fs.writeFileSync('./book/' + title + '/META-INF/container.xml', fs.readFileSync('./template/container.xml', 'utf8'))
  callback()
}