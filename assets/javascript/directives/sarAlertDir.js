'use strict';

angular
	.module('sarAlert', [])
	.directive('sarAlert', ['$timeout', function ($timeout) {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					'type': '=',
					'title': '='
				},
				template: ['',
					'<div class="alert alert-{{ type }} alert-dismissible" role="alert">',
					'	<button type="button" class="close" data-dismiss="alert" aria-label="Close">',
					'		<span aria-hidden="true">&times;</span></button>',
					'	<strong ng-show="title">{{ title }}</strong> {{ message }}',
					'</div>'].join(''),
				link: function(scope, element, attrs) {
					scope.message = attrs.message;
					if (typeof scope.type === 'undefined') {
						scope.type = 'alert';
					}
				}
			};
		}]);

