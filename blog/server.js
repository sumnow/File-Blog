var http = require('http');
var url = require('url');
var util = require('util');
var fs = require('fs');
var path = require("path");
var router = require('./fileRoute');

var port = 8080;
var pagePath = "/index.html"

router.setRootPath(__dirname);

router.get('/', function (req, res) {
    // 文件首页
    router.sendFile(res, pagePath);
});


const srv = http.createServer((req, res) => {
    router.init(req, res);
    const params = url.parse(req.url, true).query;
    const paths = url.parse(req.url, true).pathname;
    console.log(paths, params);

    if (paths === '/catalog') {
        if (params.type) {
            if (params.filename) {
                const text = fs.readFileSync(`markdown/code/${params.type}/${params.filename}`, 'utf8');
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
                res.write(JSON.stringify(text));
                res.end();
            } else {
                const dir = fs.readdirSync(`markdown/code/${params.type}`, (err, files) => files)
                const jsondir = JSON.stringify(dir);
                res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                res.write(jsondir);
                res.end();
            }
        } else {
            const dir = fs.readdirSync('markdown/code', function (err, files) {
                return files;
            })
            const jsondir = JSON.stringify(dir);
            res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
            res.write(jsondir);
            res.end();
        }
    }
    //  else {
    //     res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    //     res.write('this page can not found' )
    //     res.end();
    // }
})

// 监听端口
srv.listen(port);
