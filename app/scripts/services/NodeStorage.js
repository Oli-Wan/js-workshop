'use strict';

angular.module('todoApp')
  .factory('NodeStorage', function NodeStorage($resource) {
        return $resource(
            'todos/:id',
            { id: '@id'},
            {update: {method: 'PUT'}}
        );

    });
