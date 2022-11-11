/* global angular, sprintf, vsprintf */

!function() {
    'use strict'

    angular.
        module('sprintf', []).
        filter('sprintf', function() {
            return function() {
                return sprintf.apply(null, arguments)
            }
        }).
        filter('fmt', ['$filter', function($filter: ng.IFilterService) {
            return $filter('sprintf')
        }]).
        filter('vsprintf', function() {
            return function(format: formats.DateFormat,  argv: argv) {
                return vsprintf(format, argv)
            }
        }).
        filter('vfmt', ['$filter', function($filter: ng.IFilterService) {
            return $filter('vsprintf')
        }])
}(); // eslint-disable-line