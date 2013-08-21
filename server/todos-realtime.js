var todos = [{
    title: "defaultTodo",
    completed: false
}];

exports.getTodos = function() {
    return todos;
};

exports.save = function(socket) {
    var todo = request.body;
    todo.id = sequence;
    sequence += 1;
    todos[todo.id] = todo;
};