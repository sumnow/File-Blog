var MongoClient = require('mongodb').MongoClient;
var mongoUrl = "mongodb://localhost:27017/";

module.exports = {
    find(res, params = {}) {
        MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, db) {
            if (err) throw err;
            var dbo = db.db("code");
            const projection = params.projection
            if (projection) {
                params = ((projection, ...params) => { return { ...params } })()
            }
            dbo.collection("codes").find(params, { projection }).toArray(function (err, result) { // 返回集合中所有数据
                if (err) throw err;
                db.close();
                res.writeHead(200, { 'Content-Type': 'application/json', "Cache-Control": "max-age=6000", 'Access-Control-Allow-Origin': '*' });
                console.log('\nresult:\n')
                console.log(result && result.length > 0 && result.map(e => e.name))
                res.write(result && result.length > 0 ? JSON.stringify(result) : 'not found yeah');
                res.end();
            });
        });
    }
}