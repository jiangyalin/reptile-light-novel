const fs = require("fs");

fs.readFile('./files/index.json', function (err, stats) {
    console.log(stats.toString());
})