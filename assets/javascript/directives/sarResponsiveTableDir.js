'use strict';

angular
	.module('sarResponsiveTable', [])
	.directive('sarResponsiveTable', function () {
		return {
      restrict: 'A',
      compile: function (element, attrs) {
        attrs.$addClass('responsive');
        var headers = element[0].querySelectorAll('thead > tr > th');
        if (headers.length) {
					var rows = element[0].querySelectorAll('tbody > tr');
					Array.prototype.forEach.call(rows, function(row) {
						var headerIndex = 0;
						Array.prototype.forEach.call(row.querySelectorAll('td'), function (value, index) {
							// console.log(headers);
							var th = value.parentElement.querySelector('th') || headers.item(headerIndex);
							var title = th.textContent;
							if (title && !value.getAttributeNode('data-title')) {
								value.setAttribute('data-title', title);
							}

							var colspan = value.getAttributeNode('colspan');
							headerIndex += colspan ? parseInt(colspan.value) : 1;
						});
					});
				}
			}
		};
	});
