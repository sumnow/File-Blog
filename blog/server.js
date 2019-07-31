var http = require('http');
var url = require('url');
var util = require('util');
var fs = require('fs');
var path = require("path");
var router = require('./fileRoute');
var port = process.argv[2] || 8080;
var pagePath = "/index.html"
var mongofind = require('./mongofind')

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
        console.log('\n<get> params:')
        console.log(params)
        console.log('\n-------------\n')
        try {
            const reg = /(\d{4})(0[0-9]|1[0-2])(3[0-1]|[0-2][0-9])(\d)/
            if (reg.test(params.filename)) {
                const _arr = params.filename.match(reg)
                mongofind.find(res, { "date": `${_arr[1]}${_arr[2]}${_arr[3]}`, "number": _arr[4] })
            } else {
                mongofind.find(res, { projection: { "_id": 0, "content": 0 } })
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

