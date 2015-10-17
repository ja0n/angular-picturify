# angular-picturify
Angular filter, directive, and service to picturify image urls in a text. As of **v0.0.1**, angular-picturify works for obvious image urls and base64 data. No content-type verification (future versions), only regex checking.
#### Note: The module uses $sce internally, so it doesn't support **1.2.x** and previous versions (it's an one-line change, btw).

## Install

```
npm install angular-picturify --save
```

## Usage

Inject module into your application

```javascript
//require('angular.picturify'); for browserify/webpack
//or
//<script src="node_modules/angular-picturify/dist/angular.picturify.js"></script>
angular.module('YourApp', ['picturify']);
```

Use as a [AngularJS Filter](http://docs.angularjs.org/guide/filters)

```html
<!-- As a filer -->
<div ng-bind="someModel | picturify"></div>

<!-- As a filter, with opts -->
<div ng-bind="someModel | picturify:'_blank':'chat-img':3"></div>
<!-- target="_blank" class="chat-img" -->
<div ng-bind="someModel | picturify:'_parent':200:3"></div>
<!-- target="_parent" width="200" -->
```

Use as a [AngularJS Directive](http://docs.angularjs.org/guide/directive)

```html
<!-- As a directive -->
<div ng-bind="someModel" picturify></div>

<!-- As a directive, with opts -->
<div ng-bind="someModel" picturify="{class: 'chat-img', amount: 2, target: '_blank'}"></div>
```

Inject as a [AngularJS Service](https://docs.angularjs.org/guide/providers)

```javascript
// Injected into controller
angular.module('someModule').controller('SomeCtrl', function ($scope, picturify) {
  var text = "https://angularjs.org/img/AngularJS-large.png";

  $scope.text = picturify.filter(text));
  // outputs: <a href="https://angularjs.org/img/AngularJS-large.png" target="_blank"><img src="https://angularjs.org/img/AngularJS-large.png"/></a>

});

```

## Note
* The first parameter sets the target. Defaults to '_blank'.
* The second sets the class/width*. Defaults to 150px.
* The third sets the max amount of images to be rendered. Defaults to 0, which renders all images.

*The disambiguation lies on a simple 'string or number' verification



## Build

```
npm run webpack
```
