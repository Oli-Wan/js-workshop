'use strict';

angular.module('todoApp', ['ngResource'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/todos.html',
                controller: 'TodosCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
