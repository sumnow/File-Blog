var http = require('http');
var url = require('url');
var util = require('util');
var fs = require('fs');
var path = require("path");
var router = require('./fileRoute');

var port = 8080;
var pagePath = "/index.html"

router.setRootPath(__dirname);

router.get('/', function(req, res){
    // 文件首页
    router.sendFile(res, pagePath);
});


const srv = http.createServer((req, res) => {
    router.init(req, res);
    const params = url.parse(req.url, true).query;
    const paths = url.parse(req.url, true).pathname; 
    // console.log(paths, params.filename);
    const dir = fs.readdirSync('markdown/down', function (err,files) {
        return files;
    })

    const jsondir = JSON.stringify(dir);
    if (jsondir.includes(params.filename)) {
        const text = fs.readFileSync(`markdown/down/${params.filename}`, 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.write(JSON.stringify(text));
        res.end();
    } else if (paths === '/code/catalog') {
        res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        res.write(jsondir);
        res.end();
    } 
})

// 监听端口
srv.listen(port);
