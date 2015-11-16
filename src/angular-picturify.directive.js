var service = require('./angular-picturify.service');

module.exports = angular.module('picturify.directive', [service]).directive('picturify', picturifyDirective).name;

picturifyDirective.$inject = ['picturify'];
function picturifyDirective(picturify) {
  'use strict';

  return {
    restrict: 'A',
    link: function (scope, element, attrs) {

      var opts = angular.extend({}, scope.$eval(attrs.picturify));

      scope.$watch(function(newVal) {
        element.html(picturify.filter(element.html(), opts.target, (opts.class || opts.width), opts.amount));
      });
    }
  };
}
