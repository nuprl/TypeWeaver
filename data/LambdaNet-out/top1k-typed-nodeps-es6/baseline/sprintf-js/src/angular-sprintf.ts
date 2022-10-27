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
        filter('fmt', ['$filter', function($filter: Function) {
            return $filter('sprintf')
        }]).
        filter('vsprintf', function() {
            return function(format: String, argv: String) {
                return vsprintf(format, argv)
            }
        }).
        filter('vfmt', ['$filter', function($filter: Function) {
            return $filter('vsprintf')
        }])
}(); // eslint-disable-line
