'use strict';

// Code goes here

angular.module('berkleeApp')
    .controller('filterCtrl', ['$scope', 'mapOptions', 'programDataService', '_', function($scope, mapOptions, programDataService, _) {
        this.search = {};
        $scope.checkedTypes = [];
        $scope.locations = [];
        $scope.filters = [];
        $scope.filAct = false;
        $scope.locAct = false;
        $scope.openf = false;
        $scope.options = {
            time: [],
            degree: [],
            type: []
        };
        $scope.locationOpen = false;
        $scope.typeOpen = false;

        $scope.init = function() {
            programDataService.promise.then(function(response) {
                mapOptions.opts.data = mapOptions.getData(response);
                $scope.data = response;
                $scope.initProgList(response);
                $scope.mapObject = mapOptions.opts;
            });
        };

        $scope.filterClick = function(type) {
            if (type == 'filter') {
                $scope.openTypes();
                $scope.locAct = false;
                $scope.filAct = !$scope.filAct;
            }
            if (type == 'loc') {
                $scope.openLocations();
                $scope.filAct = false;
                $scope.locAct = !$scope.locAct;
            }
        }

        $scope.initProgList = function(response) {
            var options = {
                time: [],
                interest: [],
                department: [],
                types: []
            };
            angular.forEach(response, function(value) {
                options = $scope.returnValues(options, value);
            });
            $scope.options = {
                // Type: options.tags,
                Time: _.filter(options.time, function(t) {
                    return typeof t != 'undefined' && t != null
                }),
                Department: _.filter(options.department, function(t) {
                    return typeof t != 'undefined' && t != null
                }),
                Interest: _.filter(options.interest, function(t) {
                    return typeof t != 'undefined' && t != null && t != ''
                }),
                Types: _.filter(options.types, function(t) {
                    return typeof t != 'undefined' && t != null
                })
            };

        };

        $scope.returnValues = function(current, item) {
            // current.tags = _.without(_.uniq(current.tags.concat(item.tags)), '');
            current.time = _.uniq(current.time.concat(item.time));
            current.interest = _.uniq(current.interest.concat(item.interest));
            current.department = _.uniq(current.department.concat(item.department));
            current.types = _.uniq(current.types.concat(item.types));
            var options = current;
            return options;
        };

        $scope.filterState = function() {
            var state = '';
            if ($scope.typeOpen || $scope.locationOpen) {
                state += 'open ';
                if ($scope.typeOpen) {
                    state += 'type-open';
                }
                if ($scope.locationOpen) {
                    state += 'location-open';
                }
            }
            return state;
        }

        $scope.updateActiveGeography = function(geography) {
            if (geography.id == $scope.code) {
                $scope.mapObject.data[$scope.code].fillKey = 'def';
                $scope.code = '';
            } else {
                $scope.code = geography.id;
                angular.forEach($scope.mapObject.data, function(item, key) {
                    $scope.mapObject.data[key].fillKey = 'def';
                });
                $scope.mapObject.data[$scope.code].fillKey = 'Sel';
            }
            $scope.setFilters(true);
        };

        $scope.removeFilter = function(word) {
            $scope.checkedTypes = _.without($scope.checkedTypes, word);
            $scope.filters = _.without($scope.filters, word);
        };

        $scope.isChecked = function(item) {
            return _.contains($scope.checkedTypes, item);
        };

        $scope.setFilters = function(apply_to_scope) {
            $scope.filters = [];
            var filters = [];
            if ($scope.code != '' && typeof $scope.code != 'undefined') {
                filters.push($scope.code);
            }
            if ($scope.checkedTypes.length > 0) {
                filters = _.union(filters, $scope.checkedTypes);
            }

            $scope.filters = filters;
            if (apply_to_scope) {
                $scope.$apply();
            }
        };

        $scope.openTypes = function() {
            if ($scope.typeOpen) {
                $scope.typeOpen = false;
                $scope.openf = false;
            } else {
                $scope.typeOpen = true;
                $scope.locationOpen = false;
                $scope.openf = true;
            }
        };

        $scope.openLocations = function(event) {
            if ($scope.locationOpen) {
                $scope.locationOpen = false;
                $scope.openf = false;
            } else {
                $scope.typeOpen = false;
                $scope.locationOpen = true;
                $scope.openf = true;
            }

        };

        $scope.init();

    }]);
