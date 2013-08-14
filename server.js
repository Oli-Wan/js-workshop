var express = require('express');
var todos = require('./server/todos.js');
var app = express();
var port = 3000;

app.use(express.bodyParser());

app.use(express.static('app'));

app.get('/todos', todos.get);
app.get('/todos/:id', todos.getById);
app.post('/todos', todos.post);
app.put('/todos/:id', todos.put);
app.delete('/todos/:id', todos.delete);

app.listen(port);
console.log("Server listening on port "+port);