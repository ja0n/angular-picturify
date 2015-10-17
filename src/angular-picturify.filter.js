module.exports = angular.module('picturify.filter', []).filter('picturify', picturifyFilter).name;

picturifyFilter.$inject = ['$sce'];
function picturifyFilter($sce) {
  'use strict';

  return function(text, target, style, n) {
    target = !target ? '_blank' : target;
    style = (!style || style < 0) ? 150 : style;
    n = (!n || n < 0) ? 0 : n;

    style = typeof style === 'string'
          ? 'class="' + style + '"'
          : 'width="' + style + '"'
          ;

    //((?:data:image\/(?:\s*\S*);base64,(?:(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=))))(?=$|\s)|((?:https?\:\/\/|www\.)+(?![^\s]*?")(?:[\w.,@?!^=%&amp;:\/~+#-]*[\w@?!^=%&amp;\/~+#-]?\.(?:png|jpg|svg|gif|webp|bmp)))(?=$|\s)
    var regexStr = '((?:data:image\/(?:\\s*\\S*);base64,(?:(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=))))(?=$|\\s)|((?:https?\\:\/\/|www\\.)+(?![^\s]*?")([\\w.,@?!^=%&amp;:\/~+#-]*[\\w@?!^=%&amp;\/~+#-]?\\.(?:png|jpg|svg|gif|webp|bmp)))(?=$|\\s)';
    var regex = new RegExp(regexStr, n ? 'i' : 'gi');
    console.log(regex);
    var i = 0;
    do {
      text = text.replace(regex, '<a href="$&" target="'+ target +'"><img '+ style +' src="$&"/></a>')
    } while((!n || ++i < n) && regex.test(text));

    return $sce.trustAsHtml(text);
  }
}
