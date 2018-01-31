const fs = require("fs");

// 读取实体类
const entityData = fs.readFileSync('./apiFormat/Product.java', 'utf8');
let entityObject = [];
let entity = {};
const main = (text) => {
    const mono = text.substring(text.indexOf('/** ') + 4, text.indexOf(' */'));
    let type = text.substring(text.indexOf('private ') + 8, text.indexOf(';'));
    const node = type;
    type = type.substring(0, type.lastIndexOf(' '));
    const name = node.substring(type.length + 1);
    const newText = text.substring(text.indexOf(';') + 1);
    entityObject.push({
        name: name,
        type: type,
        mono: mono
    });
    entity[name] = type;
    if (newText.indexOf(';') !== -1) {
        return main(newText);
    } else {
        return ''
    }
}
main(entityData);
// console.log(entityObject);
let apiString  = '';
entityObject.forEach(data => {
    apiString += '|' + data.name + '|' + data.type + '|' + data.mono + '|\n';
});
// console.log(entity);
// console.log(apiString);

// 读取验证
const verificationData = fs.readFileSync('./apiFormat/verification.txt', 'utf8');
let verification = {};
const verificationArray = verificationData.split(',');
const verificationObject = [];
verificationArray.forEach(data => {
    const key = data.substring(data.indexOf('"') + 1, data.indexOf('":'));
    let val = data.substring(data.indexOf('": ') + 3);
    if (val.indexOf('"') !== -1) val = val.substring(1, val.length - 1);
    verification[key] = val;
    verificationObject.push({
        name: key,
        val: val
    })
});
// console.log(verification);

// 正验
let entityError = []; // 实体类多余的参数
entityObject.forEach(data => {
    const val = verification[data.name];
    if (val == undefined) {
        entityError.push(data.name)
    }
});

// 反验
let verificationError = []; // 实体类缺少的参数
verificationObject.forEach(data => {
    const val = entity[data.name];
    if (val == undefined) {
        verificationError.push(data.name)
    }
});

// console.log(entityError);
apiString += '\n\n\nerror: ' + entityError + ' (实体类多余的参数)';
apiString += '\n\n\nerror: ' + verificationError + ' (实体类缺少的参数)';
fs.writeFile('./apiFormat/array.txt', apiString,  function(err) {
    console.log('成功');
    if (err) return console.error(err);
});
fs.writeFile('./apiFormat/array.json', JSON.stringify(entityObject),  function(err) {
    console.log('成功');
    if (err) return console.error(err);
});

let apiString2 = '';

entityObject.forEach(entityObjectData => {
    let state = true;
    entityError.forEach(entityErrorData => {
        if (entityObjectData.name == entityErrorData) {
            state = false;
        }
    });
    if (state) apiString2 += '|' + entityObjectData.name + '|' + entityObjectData.type + '|' + entityObjectData.mono + '|\n';
});
fs.writeFile('./apiFormat/array2.txt', apiString2,  function(err) {
    console.log('成功');
    if (err) return console.error(err);
});