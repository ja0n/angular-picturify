var filter = require('./angular-picturify.filter');
var service = require('./angular-picturify.service');
var directive = require('./angular-picturify.directive');

module.exports = angular.module('picturify', [filter, service, directive]).name;
