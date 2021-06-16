var http = require('http');
console.log('This example is different!');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('Hello Abdullah!');
}).listen(8080);