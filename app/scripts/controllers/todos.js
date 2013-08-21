'use strict';

angular.module('todoApp')
    .controller('TodosCtrl', function ($scope, socket) {
        $scope.todos = [];

        socket.on("todos", function (data) {
            $scope.todos = [];
            data.forEach(function (element) {
                if (element)
                    $scope.todos.push(element);
            });
        });

        socket.on("new todo", function (todo) {
            console.log("new todo", todo);
            $scope.todos.push(todo);
        });

        socket.on("delete todo", function (todo) {
            $scope.applyOnTodos(function (element) {
                if (element.id != todo.id)
                    return element;
                return false;
            });
        });

        socket.on("update todo", function (todo) {
            $scope.applyOnTodos(function (element) {
                if (element.id == todo.id)
                    return todo;
                return element;
            });
        });

        $scope.addTodo = function () {
            if (!$scope.newTodo ||
                typeof $scope.newTodo !== 'string' ||
                $scope.newTodo.trim().length <= 0)
                return;

            var todo = {
                title: $scope.newTodo.trim(),
                completed: false
            };
            socket.emit('new todo', todo);
        };

        $scope.removeTodo = function (todo) {
            socket.emit('delete todo', todo);
        };

        $scope.startEditing = function (todo) {
            $scope.backupTodo = angular.extend({}, todo);
            $scope.editingTodo = todo;
        };

        $scope.doneEditing = function () {
            $scope.backupTodo = null;
            $scope.editingTodo.title = $scope.editingTodo.title.trim();
            socket.emit('update todo', $scope.editingTodo);
            $scope.editingTodo = null;
        };

        $scope.cancelEditing = function (todo) {
            todo.title = $scope.backupTodo.title;
            $scope.backupTodo = null;
            $scope.editingTodo = null;
        };

        $scope.toggleCompletion = function (todo) {
            if ($scope.editingTodo)
                return;
            todo.completed = !todo.completed;
            $scope.onCompleted(todo);
        };

        $scope.onCompleted = function (todo) {
            socket.emit('update todo', todo);
        };

        $scope.filter = function (completed) {
            $scope.completionFilter = {
                completed: completed
            };
        };

        $scope.removeFilter = function () {
            $scope.completionFilter = null;
        };

        $scope.applyOnTodos = function (fn) {
            var newTodos = [];
            $scope.todos.forEach(function (element) {
                element = fn(element);
                if (element)
                    newTodos.push(element);
            });
            $scope.todos = newTodos;
        };
    });
