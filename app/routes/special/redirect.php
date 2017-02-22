<?php global $_ROUTE; ?><script>

var countries = { 'de-at':1,'en-be':1,'en-bg':1,'en-hr':1,'en-cz':1,'en-dk':1,'en-ee':1,'en-fi':1,'fr-fr':1,'de-de':1,'en-gr':1,'en-hu':1,'en-ie':1,'it-it':1,'en-lv':1,'en-lu':1,'en-nl':1,'en-no':1,'en-pl':1,'en-pt':1,'en-ro':1,'en-sk':1,'en-si':1,'en-es':1,'en-se':1,'en-ch':1,'en-tr':1,'en-ua':1,'en-gb':1,'en-ar':1,'en-ca':1,'en-cl':1,'en-co':1,'en-mx':1,'en-us':1,'cn-cn':1,'cn-hk':1,'en-in':1,'en-id':1,'en-il':1,'jp-jp':1,'en-my':1,'en-ph':1,'ru-ru':1,'en-sg':1,'en-kr':1,'en-tw':1,'en-th':1,'en-vn':1,'en-eg':1,'en-za':1,'en-tn':1,'en-au':1,'en-nz':1,'en-wx':1 };

var locale = (navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || 'en-wx').toLowerCase();
if (locale.length === 2) locale = locale + '-' + locale;
var lang = locale.substr(0,2);

if (!(locale in countries)) locale = 'en-wx';

location.href = '/' + locale + '/<?= $_ROUTE['data']['url'] ?>';

</script>