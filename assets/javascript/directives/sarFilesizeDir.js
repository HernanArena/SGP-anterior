(function() {
	'use strict';

	angular
		.module('sarFilesize', [])
		.directive('sarFilesize', function () {
			return {
				restrict: 'E',
				template: ['',
					'<small>({{ size }} {{ unit }})</small>',
				].join(''),
				replace: true,
				link: function (scope, element, attrs) {
					var units = ['Kb', 'Mb', 'Gb', 'Tb'];
					var unitId = 0;
					var convert = fnConvert;

					scope.size = convert(attrs.size);
					scope.unit = units[unitId];

					function fnConvert(size) {
						var newvalue = size / 1024;
						var value = Math.round(newvalue * 100) / 100;
						if (value > 1024) {
							unitId++;
							value = convert(value);
						}
						return value;
					}
				}
			};
		});
})();
