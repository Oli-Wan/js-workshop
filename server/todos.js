var todos = [];
var sequence = 0;

exports.get = function (request, response) {
    response.send(todos);
};

exports.getById = function (request, response) {
    var id = request.param("id");
    var foundTodo;
    for(var i = 0; i < todos.length; i++) {
        if(todos[i].id == id) {
            foundTodo = todos[i]
            break;
        }
    }
    if (foundTodo)
        response.send(200, foundTodo);
    else
        response.send(404, "Todo #" + id + " not found");
};

exports.post = function (request, response) {
    if (!request.is('application/json')) {
        response.send(406, "Accepts only application/json");
        return;
    }
    var todo = request.body;
    todo.id = sequence;
    sequence += 1;
    todos[todo.id] = todo;
    response.send(200, todo);
};

exports.put = function (request, response) {
    if (!request.is('application/json')) {
        response.send(406, "Accepts only application/json");
        return;
    }
    var id = request.param("id");
    var newTodo = request.body;
    var newTodos = [];
    todos.forEach(function (todo) {
        if (todo.id != id)
            newTodos.push(todo);
        else
            newTodos.push(newTodo);
    });
    todos = newTodos;
    response.send(200, todos[id]);
};

exports.delete = function (request, response) {
    var id = request.param("id");
    var newTodos = [];
    todos.forEach(function (todo) {
        if (todo.id != id)
            newTodos.push(todo);
    });
    todos = newTodos;
    response.send(200, "Todo #" + id + " deleted");
};