// 5.
// 合并内容
const fs = require('fs')

const updatedList = fs.readFileSync('./files/word.json', 'utf8')
const word = JSON.parse(updatedList)

word.forEach(item => {
  let text = item.bookName + '\r\n'
  item.node.forEach(node => {
    if (node) {
      const _txt = node.jointName + '\r\n' + node.node.join('\r\n')
      // fs.writeFileSync('./files/txt/' + node.jointName + '.txt', _txt) // 记录分页内容
      text += _txt
    }
  })
  fs.writeFileSync('./files/word/' + item.bookName + '.txt', text)
})