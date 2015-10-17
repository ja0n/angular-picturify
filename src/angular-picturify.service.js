var filter = require('./angular-picturify.filter');

module.exports = angular.module('picturify.service', [filter]).service('picturify', picturifyService).name;


picturifyService.$inject = ['$filter'];
function picturifyService($filter) {
  'use strict';

  return {
    filter: $filter('picturify')
  }
}
