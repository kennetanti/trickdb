const http = require('http');
const url = require('url');
const sqltomango = require('sqltomango');
const backend = require('./backend-couch.js');

const hostname = '0.0.0.0';
const port = 8123;

function collectRequestData(request, callback) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(body);
        });
}

function handleSqlQuery(sqlquery, callback) {
	console.log("QUERY: ${sqlquery}");
	
	mangoQuery = sqltomango.parse(sqlquery);
	
	console.log(mangoQuery);
	
	callback(mangoQuery);
	
}

function runQuery(mangoQuery, callback) {
	backend.query(mangoQuery, result => {
		callback(result);
	});
	
}

const server = http.createServer((req, res) => {
	if (req.method == "GET" && req.url == "/") {
		res.statusCode = 200;
		res.setHeader('X-Tricky', 'test-success');
		res.end('Ok.\n');
	} else {
		requrl = url.parse(req.url, true);
		sqlQuery = requrl.query.query;
		if (req.method == "POST") {
			collectRequestData(req, result => {
				sqlQuery += "\n" + result;
				handleSqlQuery(sqlQuery, datas => {
					// do next thing
				});
			});
		} else {
			handleSqlQuery(sqlQuery, datas => {
					// do next thing
			});
		}
	}
	
  //res.statusCode = 200;
  //res.setHeader('Content-Type', 'text/plain');
  //res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log("Server running at http://${hostname}:${port}/");
});
