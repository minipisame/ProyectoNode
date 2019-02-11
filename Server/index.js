var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/dist');
});


var nicknames=[];
var notas =[];


io.on('connection', function(socket){
  socket.emit('notas', notas)
  socket.on('send_participantes',function(data){
    io.emit('participantes', data)
    })

  socket.on('send_nick',function(nick){
    socket.nick=nick;
    io.emit('nick',nick);
    nicknames.push(nick);
  })

  socket.on('send_message',function(data){
    io.emit('message', data)
    })

  socket.on('send_notas', function(data) {
  
    socket.broadcast.emit('notas', data)
    notas = data;

    

});

  


});

http.listen(port, function(){
  console.log('listening on *:' + port);
});