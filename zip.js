// 生成zip文件
const fs = require("fs");
const path = require('path');
const JSZip = require("jszip");

let zip = new JSZip();

zip.file('files/a.jpg')
// zip.folder("files/k");
zip.generateNodeStream({type:'nodebuffer',streamFiles:true})
  .pipe(fs.createWriteStream('out.zip'))
  .on('finish', function () {
    // JSZip generates a readable stream with a "end" event,
    // but is piped here in a writable stream which emits a "finish" event.
    console.log("out.zip written.");
  });