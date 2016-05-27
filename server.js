var app = require('http').createServer(handler)
, io = require('socket.io').listen(app)
, fs = require('fs') 
app.listen(8080);

function handler (req, res) {
    fs.readFile(__dirname + '/index.html',
    function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error loading index.html');
        }

    res.writeHead(200);
    res.end(data);
    });
}

var sockts=[];
io.sockets.on('connection', function (socket) {
    sockts.push(socket);
    socket.on("hello",function(data) {
        for (var i in sockts){
            sockts[i].emit("newClient",data)
        }
    })
    socket.on('accelerometer',function(data){
        for (var i in sockts){
            sockts[i].emit("update",data)
        }
    })
});