module.exports = name => {
  let _name = name
  _name = _name.replace(/</g, '(')
  _name = _name.replace(/>/g, ')')
  _name = _name.replace(/\//g, '-')
  _name = _name.replace(/\\/g, '-')
  _name = _name.replace(/\?/g, '-')
  _name = _name.replace(/:/g, '-')
  _name = _name.replace(/\*/g, '-')
  _name = _name.replace(/"/g, '\'')
  return _name
}