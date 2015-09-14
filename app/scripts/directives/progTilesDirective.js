'use strict';

// Code goes here

angular.module('berkleeApp')
    .directive('progTiles', ['$rootScope', function($rootScope) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/directives/templates/progTiles.html',
            controllerAs: 'vm',
            scope: {
                filters: '=',
                search: '=',
                data: '=',
                openf: '=',
            },
            controller: ['$scope', function($scope) {
                    $scope.init = function() {
                    },
                    $scope.openFilters = function(){
                        return $scope.openf;
                    },
                    $scope.evaluateFilters = function(tile, filters, search) {
                        var s_match, f_match;
                        if (search) {
                            var title = tile.title.toLowerCase();
                            var match = title.indexOf(search.toLowerCase());
                            if (match == 0) {
                                s_match = true;
                            } else {
                                return 'gone';
                            }
                        } else {
                            s_match = true;
                        }
                        if (filters.length > 0) {
                            var find = 0;
                            var countries_list = $scope.cleanLoc(tile.countries);
                            var merged = _.map(_.union(tile.types, tile.time, tile.department, tile.interest, countries_list), function(value) {
                                return value.toLowerCase();
                            });
                            angular.forEach(filters, function(item) {
                                if (typeof item != 'undefined') {
                                    var index = _.indexOf(merged, item.toLowerCase());
                                    index >= 0 ? find++ : find;
                                }
                            });
                            if (find > 0) {
                                f_match = true;
                            }
                        } else {
                            f_match = true;
                        }

                        if (s_match && f_match) {
                            return '';
                        } else {
                            return 'gone';
                        }
                    },
                    $scope.cleanLoc = function(list) {
                        var countries = [];
                        angular.forEach(list, function(el, index) {
                            countries.push(el.info.location);
                        });
                        return countries;
                    };
                $scope.init();
            }],
        }
    }]);
