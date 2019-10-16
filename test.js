const fs = require("fs");

// fs.readFile('./files/index.json', function (err, stats) {
//     console.log(JSON.parse(stats.toString()).elements[1].elements[2].elements[1].elements[46]);
// });
let tt = './files/Hero...? 2.html'
// tt = tt.replace(/</g, '(')
// tt = tt.replace(/>/g, ')')
// tt = tt.replace(/\//g, ')')
tt = tt.replace(/\?/g, ')')
console.log('rr', tt)
// fs.writeFileSync(tt, 'xml') // 记录内容页