// 拉取资源
const fs = require("fs");
const path = require('path');
const Crawler = require("crawler");
const convert = require('xml-js');
const config = require("./config");

let crawler = new Crawler({
  encoding: null, // 编码
  maxConnections : 10, // 最大并发请求数
  callback : function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      fs.createWriteStream(res.options.filename).write(res.body);
    }
    done();
  }
});

let urls = [];
config.url.forEach(function (data, index) {
  let url = {
    uri: data,
    jQuery: true,

    callback: function (error, res, done) {
      if(error){
        console.log(error);
      }else{
        main(res);
      }
      done();
    }
  };
  urls.push(url);
});

const main = function (res) {
  const xml = res.body.toString();
  const json = convert.xml2json(xml, {compact: false, spaces: 4});
  let node = JSON.stringify(json);
  fs.writeFile('./files/index.html', xml,  function(err) {
    if (err) return console.error(err);
  });
  fs.writeFile('./files/index.txt', json,  function(err) {
    if (err) return console.error(err);
  });
  console.log(node);
};

crawler.queue(urls);