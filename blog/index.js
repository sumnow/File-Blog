var http = require('http');
var url = require('url');
var util = require('util');
var fs = require('fs');
var path = require("path");
var router = require('./config/route');


router.setRootPath(__dirname);

router.get('/', function(req, res){
    console.log(res);
    router.sendFile(res, "/index.html");
});//处理/的get请求


const srv = http.createServer((req, res) => {
    router.init(req, res);
    // var pathname=__dirname+url.parse(req.url).pathname;
    const params = url.parse(req.url, true).query;
    const paths = url.parse(req.url, true).pathname; 
    console.log(paths, params.filename);
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
    // else {
    //     res.writeHead(404, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
    //     res.write('error page');
    //     res.end();
    // }
})

srv.listen(8080);
