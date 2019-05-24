(function() {
	'use strict';

	angular
		.module('sarHref', [])
		.directive('sarHref', function () {
			return {
				restrict: 'A',
				scope: '=',
				link: function (scope, element, attrs) {
					element.bind('click', function(event) {
						history.back();
					});
				}
			};
		});
})();
