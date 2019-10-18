const axios = require('axios')
const config = require('./config')

axios({
  url: config.url[0],
  method: 'post',
  params: {},
  data: {
    action: 'login',
    jumpurl: 'http://www.wenku8.net/wap/article/toplist.php?sort=lastupdate',
    username: '七罪魔魂',
    password: '1995991'
  },
  timeout: 1000 * 60,
  headers: {
  }
}).then(response => {
  console.log('a', response.data)
}).catch(error => {
  console.log('b', error)
})