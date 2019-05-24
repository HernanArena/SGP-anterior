'use strict';

angular
	.module('sarBtnCollapse', [])
	.directive('sarBtnCollapse', function () {
		return {
			restrict: 'A',
			replace: false,
			scope: {
				'target': '@',
				'openIcon': '@'
			},
			link: function (scope, element, attrs) {
				var target = angular.element(attrs.target);
				var icon = angular.element(element.find('i')[0]).attr('class').split(' ')[1];
				var iconOpen = attrs.openIcon ? attrs.openIcon : 'fa-close';
				var totalbuttons = angular.element.find('[sar-btn-collapse]').length;

				scope.open = false;

				scope.$watch('open', function(newvalue) {
					if (newvalue) {
						element
							.css({ opacity: 0.5 })
							.attr('disabled', (totalbuttons > 1) ? true : false);
						element.find('i')
							.removeClass(icon)
							.addClass(iconOpen);
					} else {
						element
							.css({ opacity: 1 })
							.attr('disabled', false);
						element.find('i')
							.removeClass(iconOpen)
							.addClass(icon);
					}
				});

				element.bind('click', function() {
					target.slideToggle('fast', function() {
						scope.$apply(function () {
							scope.open = target.is(':visible');
						});
					});
				});
			}
		};
	});
