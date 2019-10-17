// 过滤字符串页码
module.exports = name => {
  let _name = name
  _name = _name.replace(/\[[\S]*?\/[\S]*?\]/g, '')
  if (_name.indexOf('\r\n') === 0) _name = _name.replace(/\r\n/, '')
  return _name
}