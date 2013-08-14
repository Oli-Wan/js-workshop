'use strict';

angular.module('todoApp')
    .service('TodoStorage', function TodoStorage(localStorage) {
        this.key = "NG_TODO";
        this.save = function (todos) {
            localStorage.setItem(this.key, JSON.stringify(todos));
        };
        this.read = function () {
            var todos = localStorage.getItem(this.key);
            if (todos)
                return JSON.parse(todos);
            else
                return [];
        }
    });
