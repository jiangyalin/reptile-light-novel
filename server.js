// 拉取资源
const fs = require("fs");
const path = require('path');
const Crawler = require("crawler");
const config = require("./config");

let crawler = new Crawler({
  encoding: null,
  maxConnections : 10,
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
        let $ = res.$;
        let imgs = [];
        const imgsLength = $(".main").find(".news").find("[type='image']").length;
        const title = $('.main').find('.tit1').text();
        for (let i = 0; i < imgsLength; i++) {
          const index = 100 + i;
          let src = $(".main").find(".news").find("[type='image']")[i].attribs.src;
          src = 'https' + src.substring(4);
          let img = {
            title: title,
            fileName: '' + index,
            url: src
          };
          imgs.push(img);
        }
        console.log('title',title)
        const myPath = path.resolve('./files') + '\\' + title;
        // 生成日志文件
        // fs.writeFile('./files/' + title + '/imgs.text', imgs, 'utf-8', function(err) {
        //   if (err) {
        //     throw err;
        //   }
        //   console.log('日志文件生成成功');
        // });
        console.log(imgs);
        let arr = [];
        // 纪录图片资源信息
        imgs.forEach(function (data, index) {
          let node = {
            uri: data.url,
            jQuery: true,

            callback: function (error, res, done) {
              if(error){
                console.log('err', error);
              }else{
                // 生成图片文件
                fs.writeFile('./files/' + title + '/' + data.fileName + '.jpg', res.body, function(err) {
                  if (err) {
                    throw err;
                  }
                  console.log('Saved.' + data.fileName);
                });
              }
              done();
            }
          };
          arr.push(node);
        });
        console.log('arr',arr);

        // 创建文件夹
        fs.exists(myPath, function(exists){
          if (exists) {
            console.log('文件夹存在');
            crawler.queue(arr); // 请求资源
          } else {
            fs.mkdir(myPath, function(err){
              if (err) {
                console.error(err);
              }
              console.log('创建目录成功');
              crawler.queue(arr); // 请求资源
            });
          }
        });
      }
      done();
    }
  }
  urls.push(url);
});

crawler.queue(urls);