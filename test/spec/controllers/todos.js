'use strict';

describe('Controller: TodosCtrl', function () {

    // load the controller's module
    beforeEach(module('todoApp'));

    var TodosCtrl,
        scope,
        todoStorage;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($controller, $rootScope) {
        todoStorage = {
            read: function () {
                return [];
            },
            save: function () {
            }
        };
        scope = $rootScope.$new();
        spyOn(todoStorage, 'read').andCallThrough();
        spyOn(todoStorage, 'save');
        TodosCtrl = $controller('TodosCtrl', {
            $scope: scope,
            TodoStorage: todoStorage
        });
    }));

    it("should attach todos to the scope", function () {
        expect(scope.todos).toBeDefined();
    });

    it("should add todos to the todo list", function () {
        var todo = "My new awesome todo";
        scope.newTodo = todo;
        scope.addTodo();
        expect(scope.todos.length).toBe(1);
        expect(scope.todos[0].title).toBe(todo);
        expect(scope.newTodo).toBe(null);
        expect(todoStorage.save).toHaveBeenCalled();
    });

    it("should not add empty todo", function () {
        scope.newTodo = "";
        scope.addTodo();
        expect(scope.todos.length).toBe(0);
    });

    it("should not fail on non-string todo", function () {
        scope.newTodo = 1337;
        scope.addTodo();
        expect(scope.todos.length).toBe(0);
    });

    it("should remove todo", function () {
        scope.todos = [
            {
                title: "todo 1"
            },
            {
                title: "todo 2"
            }
        ];
        scope.removeTodo(scope.todos[0]);
        expect(scope.todos.length).toBe(1);
        expect(scope.todos[0].title).toBe("todo 2");
        expect(todoStorage.save).toHaveBeenCalled();
    });

    it("should enter edit mode", function () {
        scope.todos = [
            {
                title: "todo 1"
            },
            {
                title: "todo 2"
            }
        ];
        scope.startEditing(scope.todos[0]);
        expect(scope.backupTodo).toEqual(scope.todos[0]);
    });

    it("should save edited todo", function () {
        scope.todos = [
            {
                title: "todo 1"
            },
            {
                title: "todo 2"
            }
        ];
        scope.backupTodo = angular.extend({}, scope.todos[0]);
        scope.todos[0].title = "modified";
        scope.doneEditing(scope.todos[0]);
        expect(scope.backupTodo).toEqual(null);
        expect(todoStorage.save).toHaveBeenCalledWith(scope.todos);
    });

    it("should cancel editing todo", function () {
        scope.todos = [
            {
                title: "todo 1"
            },
            {
                title: "todo 2"
            }
        ];
        scope.backupTodo = angular.extend({}, scope.todos[0]);
        scope.todos[0].title = "modified";
        scope.cancelEditing(scope.todos[0]);
        expect(scope.backupTodo).toEqual(null);
        expect(scope.todos[0].title).toEqual("todo 1");
        expect(todoStorage.save).not.toHaveBeenCalled();
    });
});
