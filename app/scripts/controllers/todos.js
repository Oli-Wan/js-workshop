'use strict';

angular.module('todoApp')
    .controller('TodosCtrl', function ($scope, NodeStorage) {
        $scope.todos = NodeStorage.query();

        $scope.addTodo = function () {
            if (!$scope.newTodo ||
                typeof $scope.newTodo !== 'string' ||
                $scope.newTodo.trim().length <= 0)
                return;

            var todo = {
                title: $scope.newTodo.trim(),
                completed: false
            };
            NodeStorage.save(todo, function(data){
                $scope.todos.push(data);
                $scope.newTodo = null;
            });
        };

        $scope.removeTodo = function (todo) {
            var index = $scope.todos.indexOf(todo);
            $scope.todos.splice(index, 1);
            NodeStorage.delete({
                id: todo.id
            });
        };

        $scope.startEditing = function (todo) {
            $scope.backupTodo = angular.extend({}, todo);
            $scope.editingTodo = todo;
        };

        $scope.doneEditing = function () {
            $scope.backupTodo = null;
            $scope.editingTodo.title = $scope.editingTodo.title.trim();
            NodeStorage.update($scope.editingTodo);
            $scope.editingTodo = null;
        };

        $scope.cancelEditing = function (todo) {
            todo.title = $scope.backupTodo.title;
            $scope.backupTodo = null;
            $scope.editingTodo = null;
        };

        $scope.onCompleted = function (todo) {
            NodeStorage.update(todo);
        };

        $scope.filter = function (completed) {
            $scope.completionFilter = {
                completed: completed
            };
        };

        $scope.removeFilter = function () {
            $scope.completionFilter = null;
        };
    });
