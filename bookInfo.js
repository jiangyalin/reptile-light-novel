// 拉取资源(详情)
const fs = require("fs");
const path = require('path');
const Crawler = require("crawler");
const convert = require('xml-js');

const updatedList = fs.readFileSync('./files/info/updatedList.json', 'utf8');

const GetUpdatedUrls = updatedList => {
    return updatedList.node.map(data => {
        return data.href;
    });
};

const urls = GetUpdatedUrls(JSON.parse(updatedList));
console.log(urls);

let crawler = new Crawler({
    encoding: null, // 编码
    maxConnections : 5, // 最大并发请求数
    callback : (error, res, done) => {
        if (error) {
            console.log(error);
        } else {
            console.log(res.options)
            // fs.createWriteStream(res.options.filename).write(res.body);
        }
        done();
    }
});

urls.forEach((data) => {
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
    console.log('ppp');
    const xml = res.body.toString();
    const json = convert.xml2json(xml, {compact: false, spaces: 4});
    let node = JSON.stringify(json); // 返回的结构
    fs.writeFile('./files/info/index.html', xml, (err) => {
        if (err) return console.error(err);
    });
};

// // 获取最新更新的轻小说列表（格式化后的xml的json结构）
// const GetUpdatedList = json => {
//     let node = [];
//     const newBook = json.elements[1].elements[2].elements[1];
//     for (let i = 0; i < 6; i++) {
//         const a = newBook.elements[(46 + i * 2)];
//         node.push({
//             title: a.elements[0].text,
//             href: a.attributes.href
//         })
//     }
//     return {
//         tips: '更新的轻小说列表',
//         node: node
//     }
// };
//
// const GetUpdatedUrls = updatedList => {
//     return updatedList.node.map(data => {
//         return data.href;
//     });
// };

crawler.queue(urls);