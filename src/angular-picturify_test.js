'use strict';

describe('picturify module', function() {
  beforeEach(module('picturify'));

  describe('test filter', function() {
    var $filter, picturify;

    beforeEach(inject(function(_$filter_, $sce) {
      $filter = _$filter_;
      picturify = function(text, target, style, n) {
        return $sce.getTrustedHtml(_$filter_('picturify')(text, target, style, n));
      }
    }));

    it('no arguments', function() {
      var input = 'https://angularjs.org/img/AngularJS-large.png';
      expect(picturify(input))
        .toEqual('<a href="https://angularjs.org/img/AngularJS-large.png" target="_blank"><img src="https://angularjs.org/img/AngularJS-large.png"/></a>');
    });

    it('setting target and width', function() {
      var input = 'https://angularjs.org/img/AngularJS-large.png';
      expect(picturify(input, '_parent', 200))
        .toEqual('<a href="https://angularjs.org/img/AngularJS-large.png" target="_parent"><img width="200" src="https://angularjs.org/img/AngularJS-large.png"/></a>');
    });

    it('setting target and class', function() {
      var input = 'https://angularjs.org/img/AngularJS-large.png';
      expect(picturify(input, '_parent', 'myClass'))
        .toEqual('<a href="https://angularjs.org/img/AngularJS-large.png" target="_parent"><img class="myClass" src="https://angularjs.org/img/AngularJS-large.png"/></a>');
    });

    it('setting max amount to one', function() {
      var input = 'https://angularjs.org/img/AngularJS-large.png https://angularjs.org/img/AngularJS-large.png';
      expect(picturify(input, '_parent', 'myClass', 1))
        .toEqual('<a href="https://angularjs.org/img/AngularJS-large.png" target="_parent"><img class="myClass" src="https://angularjs.org/img/AngularJS-large.png"/></a> https://angularjs.org/img/AngularJS-large.png');
    });
    
    it('agglutinated urls', function() {
      var input = 'https://angularjs.org/img/AngularJS-large.pnghttps://angularjs.org/img/AngularJS-large.png';
      expect(picturify(input, '_parent', 'myClass', 1))
        .toEqual('<a href="https://angularjs.org/img/AngularJS-large.pnghttps://angularjs.org/img/AngularJS-large.png" target="_parent"><img class="myClass" src="https://angularjs.org/img/AngularJS-large.pnghttps://angularjs.org/img/AngularJS-large.png"/></a>');
    });
  });
});
