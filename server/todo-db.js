var todos = [];

var sequence = 0;


exports.persist = function (todo) {
    todo.id = sequence;
    sequence += 1;
    todos[todo.id] = todo;
    return todo;
};

exports.update = function (todo) {
    var id = todo.id;
    var newTodos = [];
    todos.forEach(function (todoInList) {
        if (todoInList.id != id)
            newTodos.push(todoInList);
        else
            newTodos.push(todo);
    });
    todos = newTodos;
    return todo;
};

exports.delete = function (todo) {
    var id = todo.id;
    var newTodos = [];
    todos.forEach(function (todo) {
        if (todo.id != id)
            newTodos.push(todo);
    });
    todos = newTodos;
};

exports.get = function () {
    return todos;
};