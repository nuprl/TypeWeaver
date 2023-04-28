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
        filter('fmt', ['$filter', function($filter: sprintf) {
            return $filter('sprintf')
        }]).
        filter('vsprintf', function() {
            return function(format: string, argv: any[]) {
                return vsprintf(format, argv)
            }
        }).
        filter('vfmt', ['$filter', function($filter: any) {
            return $filter('vsprintf')
        }])
}(); // eslint-disable-line