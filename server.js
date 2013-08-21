var express = require('express');
var io = require('socket.io');
var http = require('http');
var todos = require('./server/todos.js');
var todoDb = require('./server/todo-db.js');

var app = express();
var port = 3000;

var server = http.createServer(app);
server.listen(port);
io = io.listen(server);

app.use(express.bodyParser());

app.use(express.static('app'));

// rest services
app.get('/todos', todos.get);
app.get('/todos/:id', todos.getById);
app.post('/todos', todos.post);
app.put('/todos/:id', todos.put);
app.delete('/todos/:id', todos.delete);

// realtime services
io.sockets.on('connection', function (socket) {
    socket.emit('todos', todoDb.get());

    socket.on('new todo', function (todo) {
        todoDb.persist(todo);
        socket.emit('new todo', todo);
        socket.broadcast.emit('new todo', todo);
    });

    socket.on('delete todo', function (todo) {
        todoDb.delete(todo);
        socket.emit('delete todo', todo);
        socket.broadcast.emit('delete todo', todo);
    });

    socket.on('update todo', function (todo) {
        todoDb.update(todo);
        socket.emit('update todo', todo);
        socket.broadcast.emit('update todo', todo);
    });
});

console.log("Server listening on port " + port);
