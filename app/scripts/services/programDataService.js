'use strict';

angular.module('berkleeApp')
    .service('programDataService',['$http', function($http) {
        var progData = null;
        var promise = $http.get('scripts/data/berklee_MOCK_DATA_2.json').then(
            function(response){
                progData = response.data;
                return progData;
            },
            function(response){
                console.log('error');
                return response;
            }    
            );
        return {
            promise: promise,
            data: progData
        }
    }]);
