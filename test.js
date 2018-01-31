const fs = require("fs");

fs.readFile('./files/index.json', function (err, stats) {
    console.log(JSON.parse(stats.toString()).elements[1].elements[2].elements[1].elements[46]);
});