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
})

// 监听端口
srv.listen(port);
