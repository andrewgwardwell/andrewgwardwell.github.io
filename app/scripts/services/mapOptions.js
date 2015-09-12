'use strict';

// Code goes here

angular.module('berkleeApp')
    .service('mapOptions', ['_', function(_) {

        var getData = function(response) {
            var clean_data = {};
            var raw_data = response;
            angular.forEach(raw_data, function(item) {
                if (item.countries) {
                    angular.forEach(item.countries, function(single) {
                        var country = single.info.location;
                        var sub = single.info.sub_location;
                        if (clean_data[country] && clean_data[country].subloc.length > 0) {
                            clean_data[country].subloc = _.union(clean_data[country].subloc, sub);
                        } else {
                            if (sub == null) {
                                sub = [];
                            }
                            clean_data[country] = {
                                subloc: sub,
                                fillKey: 'def'
                            };
                        }
                    });
                }
            });
            return clean_data;
        };
        return {
            getData: getData,
            opts: {
                scope: 'world',
                responsive: true,
                projection: 'mercator',
                staticGeoData : true,
                options: {
                    legendHeight: 60 // optionally set the padding for the legend
                },
                geographyConfig: {
                    highlighBorderColor: '#000',
                    highlighBorderWidth: 2,
                    highlightOnHover: false,
                    highlightFillColor: '#900',
                    borderColor: '#000',
                    popupTemplate: function(geo, data) {
                        if (data == null) {
                            return;
                        }
                        return ['<div class="hoverinfo">' + geo.properties.name +
                            '</div>'
                        ].join('');
                    },
                },
                fills: {
                    'Sel': '#900',
                    'def': '#aaa',
                     defaultFill : '#fff'
                },
            }
        };
    }]);
