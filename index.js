var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
const PORT = process.env.PORT || 80

server.listen(PORT);

app.use('/public', express.static('public'));

app.get("/", function(request, respons) {
  respons.sendFile(__dirname + "/index.html");
});

console.log(`web site http://localhost:${PORT}/ started`);

users = [];
connections = [];

io.sockets.on("connection", function(socket) {
  console.log("success conection");
  connections.push(socket);

  socket.on("disconnect", function(data) {
    console.log("success disconnect");
    connections.splice(connections.indexOf(socket), 1);
  });

  socket.on("send msg", function(data) {
    console.log(data);
    let side;
    for(let i=0; i < connections.length; i++) {
      if(connections[i].id == socket.id) {
        side = i ? 'left' : 'right';
      }
    }

    io.sockets.emit("add msg", { msg: data.msg, side, class: data.class });
  });
});
