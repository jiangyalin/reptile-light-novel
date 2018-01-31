// 拉取资源
const fs = require("fs");
const path = require('path');
const Crawler = require("crawler");
const convert = require('xml-js');
const config = require("./config");

let crawler = new Crawler({
  encoding: null, // 编码
  maxConnections : 10, // 最大并发请求数
  callback : (error, res, done) => {
    if (error) {
      console.log(error);
    } else {
      fs.createWriteStream(res.options.filename).write(res.body);
    }
    done();
  }
});

let urls = [];
config.url.forEach((data, index) => {
  let url = {
    uri: data,
    jQuery: true,

    callback: (error, res, done) => {
      if (error) {
        console.log(error);
      } else {
        main(res);
      }
      done();
    }
  };
  urls.push(url);
});

const main = res => {
  const xml = res.body.toString();
  const json = convert.xml2json(xml, {compact: false, spaces: 4});
  let node = JSON.stringify(json); // 返回的结构
  fs.writeFile('./files/index.html', xml, (err) => {
    if (err) return console.error(err);
  });
  fs.writeFile('./files/index.json', json, (err) => {
    if (err) return console.error(err);
    const updatedList = GetUpdatedList(JSON.parse(JSON.parse(node))); // 轻小说列表
    fs.writeFile('./files/info/updatedList.json', JSON.stringify(updatedList), (err) => { // 写入后去的更新信息
      if (err) return console.error(err);
    });
    // const updatedUrls = GetUpdatedUrls(updatedList);
    // console.log('updatedList', updatedUrls);
  });
};

// 获取最新更新的轻小说列表（格式化后的xml的json结构）
const GetUpdatedList = json => {
  let node = [];
  const newBook = json.elements[1].elements[2].elements[1];
  for (let i = 0; i < 6; i++) {
    const a = newBook.elements[(46 + i * 2)];
    node.push({
      title: a.elements[0].text,
      href: a.attributes.href
    })
  }
  return {
    tips: '更新的轻小说列表',
    node: node
  }
};


crawler.queue(urls);