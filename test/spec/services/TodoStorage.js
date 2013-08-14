'use strict';

describe('Service: TodoStorage', function () {

    var todoStorage , mock;
    beforeEach(function () {
        mock = (function () {
            var store = {};
            return {
                getItem: function (key) {
                    return store[key];
                },
                setItem: function (key, value) {
                    store[key] = value.toString();
                },
                clear: function () {
                    store = {};
                }
            };
        })();

        module('todoApp', function ($provide) {
            $provide.value('localStorage', mock);
        });

        inject(function (TodoStorage) {
            todoStorage = TodoStorage;
        });

        spyOn(mock, 'setItem');
        spyOn(mock, 'getItem');
    });


    it('should save todos', function () {
        var todos = [
            {
                title: "Test 1",
                completed: false
            },
            {
                title: "Test 2",
                completed: false
            }
        ];
        todoStorage.save(todos);
        expect(mock.setItem).toHaveBeenCalledWith("NG_TODO", JSON.stringify(todos));
    });

    it('should read todos', function () {
        todoStorage.read();
        expect(mock.getItem).toHaveBeenCalledWith("NG_TODO");
    });
});
