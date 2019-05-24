/**
* sarUserIcon Module
*
* Description
*/
(function() {
	'use strict';

	angular.module('sarAvatar', ['tooltip'])
		.directive('sarAvatar', [function () {
			return {
				restrict: 'E',
				template: ['',
					'<div>',
						'<img ng-src="assets/images/{{ img }}" ',
						'class="img-circle" ',
						'data-toggle="tooltip" ',
						'data-placement="top" ',
						'title="{{ username }}" ',
						'tooltip />',
						'<span class="visible-xs-inline-block">{{ username }}</span>',
					'</div>'].join(' '),
				replace: true,
				scope: '@',
				// transclude: false,
				link: function (scope, elem, attrs) {
					var username = attrs.user;
					var img = (username.indexOf('Cliente') >= 0) ? 'avatar7.png' : 'avatar6.png';
					scope.img = img;
					scope.username = username;
				}
			};
		}]);
})();
