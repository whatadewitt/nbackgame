var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');

app.listen(1337);

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

var t = undefined;
var color;
var count;
var nbackcolor;

io.sockets.on('connection', function (socket) {

    checkStartTimer(socket);

  //socket.emit('news', { hello: socket.id });
  //socket.on('my other event', function (data) {
  //  socket.broadcast.emit('new user', { user: socket.id });
  //});
});

function checkStartTimer(socket) {

    if (t == undefined) {
        t=setInterval( function() {
            var n = Math.floor(Math.random() * 6);
            switch (n) {
                case 0:
                    color = "#ff0000";
                    break;
                case 1:
                    color = "#00ff00";
                    break;
                case 2:
                    color = "#0000ff";
                    break;
                case 3:
                    color = "#ffff00";
                    break;
                case 4:
                    color = "#ff00ff";
                    break;
                case 5:
                    color = "#00ffff";
                    break;
            }
            // apparently i have to do both, or the one making the original connection won't receive the change color message
            socket.emit('change_color', { color: color });
            socket.broadcast.emit('change_color', { color: color });
        }, 4000);
    }

}