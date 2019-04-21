var http = require('http');
var url = require('url');
var util = require('util');
var fs = require('fs');
var path = require("path");
var router = require('./fileRoute');
var port = process.argv[2] || 8080;
var pagePath = "/index.html"

router.setRootPath(__dirname);

router.get('/', function (req, res) {
    // 文件首页
    router.sendFile(res, pagePath);
});


const srv = http.createServer((req, res) => {
    const params = url.parse(req.url, true).query;
    const paths = url.parse(req.url, true).pathname;

    // 处理文件请求接口
    if (paths === '/catalog') {
        try {
            if (params.type) {
                if (params.filename) {
                    const text = fs.readFileSync(`markdown/knowledge/code/${params.type}/${decodeURI(decodeURI(params.filename))}.md`, 'utf8');
                    res.writeHead(200, { 'Content-Type': 'application/json',"Cache-Control": "max-age=6000", 'Access-Control-Allow-Origin': '*' });
                    res.write(JSON.stringify(text));
                    res.end();
                } else {
                    const dir = fs.readdirSync(`markdown/knowledge/code/${params.type}`, (err, files) => files)
                    const jsondir = JSON.stringify(dir);
                    res.writeHead(200, { 'Content-Type': 'application/json',"Cache-Control": "max-age=6000", 'Access-Control-Allow-Origin': '*' });
                    res.write(jsondir);
                    res.end();
                }
            } else {
                const dir = fs.readdirSync('markdown/knowledge/code', function (err, files) {
                    return files;
                })
                const jsondir = JSON.stringify(dir);
                res.writeHead(200, { 'Content-Type': 'application/json',"Cache-Control": "max-age=6000", 'Access-Control-Allow-Origin': '*' });
                res.write(jsondir);
                res.end();
            }
        } catch (e) {
            console.log('[File Error]' + e)
            res.writeHead(404);
            res.end('Not File')
        }

    } else {
        router.init(req, res);
    }
})

// 监听端口
srv.listen(port);

