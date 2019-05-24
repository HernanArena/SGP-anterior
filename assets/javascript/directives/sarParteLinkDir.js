'use strict';

angular
	.module('sarParteLink', [])
	.directive('sarParteLink', ['$window', function ($window) {
		return {
			restrict: 'A',
			scope: '=',
			replace: false,
			// required: 'code',
			link: function (scope, element, attrs, $window) {
				var code = attrs.sarParteLink;

				element.bind('click', function() {
					window.location.href = '#parte/'+ code;
				});
			}
		};
	}]);
