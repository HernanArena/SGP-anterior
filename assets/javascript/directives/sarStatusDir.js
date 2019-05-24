(function() {
	'use strict';

	angular
		.module('sarStatus', [])
		.directive('sarStatus', [function() {
			return {
				restrict: 'E',
				template: ['',
					'<span class="label actions label-warning" ',
						'alt="{{ descripcion }}" ',
						'title="{{ descripcion }}" ',
						'style="{{ bgcolor }}" ',
						'sar-style="{{ bgcolor }}">',
						'<i class="fa {{ icontype }}"></i> ',
							'{{ descripcion}}',
					'</span>'].join(''),
				replace: true,
				scope: '@',
				link: function(scope, elem, attrs){
					scope.descripcion = attrs.data;
					scope.bgcolor = attrs.color ? 'background-color: '+ attrs.color +';' : '';
					scope.icontype = attrs.icono || 'fa-warning';
				}
			};
		}]);
})();

