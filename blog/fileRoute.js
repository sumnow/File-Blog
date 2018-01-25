var url = require('url');
var path = require('path');
var querystring = require('querystring');
var fs = require('fs');
module.exports = {
    fileType: {
        "css": "text/css",
        "gif": "image/gif",
        "html": "text/html",
        "ico": "image/x-icon",
        "jpeg": "image/jpeg",
        "jpg": "image/jpeg",
        "js": "text/javascript",
        "json": "application/json",
        "pdf": "application/pdf",
        "png": "image/png",
        "svg": "image/svg+xml",
        "swf": "application/x-shockwave-flash",
        "tiff": "image/tiff",
        "txt": "text/plain",
        "wav": "audio/x-wav",
        "wma": "audio/x-ms-wma",
        "wmv": "video/x-ms-wmv",
        "xml": "text/xml"
    },
    routePathGet: {},
    routePathPost: {},
    get: function(pathname, fn) {
        this.routePathGet[pathname] = fn;
    },
    post: function(pathname, fn) {
        this.routePathPost[pathname] = fn;
    },
    rootPath: "",
    setRootPath: function(rp) {
        this.rootPath = rp;
    },
    sendFile: function(response, pathname) {
        var ext = path.extname(pathname).slice(1);
        var ft = this.fileType[ext] || "text/plain";
        response.setHeader("Content-type", [ft, "charset=utf-8"]);
        pathname = this.rootPath + pathname;
        pathname = path.normalize(pathname);
        fs.readFile(pathname, function(err, data) {
            if (err) {
                response.statusCode = 404;
                response.end('404文件不存在');
            } else {
                response.statusCode = 200;
                response.end(data, "binary");
            }
        });
    },

    init: function(request, response) {
        var fn = undefined;
        var pathname = request.url;
        
        //去除URL中的参数影响
        [...pathname].forEach((e,i)=>{
            if(e === '?'){
                pathname = pathname.slice(0,i)
            }
        })

        if (request.method.toLowerCase() === 'get') {
            fn = this.routePathGet[pathname];
        } else {
            fn = this.routePathPost[pathname];
        }
        if (fn) {
            fn(request, response);
        } else {
            this.sendFile(response, pathname);
        }
    }
};