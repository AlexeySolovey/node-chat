var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

server.listen(3333);

app.get("/", function(request, respons) {
  respons.sendFile(__dirname + "/index.html");
});

console.log("web site http://localhost:3333/ started");

users = [];

connections = [];

io.sockets.on("connection", function(socket) {
  console.log("success conection");
  connections.push(socket);

  socket.on("disconnect", function(data) {
    console.log("success disconnect");
    connections.splice(connections.indexOf(socket), 1);
  });

  socket.on("send Inna", function(data) {
    console.log(data);
    io.sockets.emit("add msg Inna", { msg: data });
  });

  socket.on("send Alex", function(data) {
    console.log(data);
    io.sockets.emit("add msg Alex", { msg: data });
  });
});
