'use strict';

angular
	.module('sarCollapse', [])
	.directive('sarCollapse', function () {
		return {
			restrict: 'A',
			replace: false,
			scope: {
				'dataanswer': '=',
				'dataticket': '=',
				'deleteAttach': '=',
				'sendTicket': '&',
				'ticket': '='
			},
			link: function (scope, element, attrs) {
				var buttons = element.find('button[sar-target]');

				scope.open = '';

				scope.$watch('open', function(newvalue, oldvalue) {
					buttons.map(function() {
						var child = $(this).attr('sar-target');
						if (newvalue !== '' && child !== scope.open) {
							$(this)
								.css({ opacity: 0.5 })
								.attr('disabled', true);
						} else {
							$(this)
								.css({ opacity: 1 })
								.attr('disabled', false);
						}
					});
				});

				element.find('button[sar-target]:not(:disabled)').bind('click', function() {
					var target = $(this).attr('sar-target');
					$(target).slideToggle('fast', function() {
						scope.$apply(function () {
							scope.open = $(target).is(':visible') ? target : '';
							$("#valoracion").rating({'size':'xs'});
						});
					});
				});
			}
		};
	});
