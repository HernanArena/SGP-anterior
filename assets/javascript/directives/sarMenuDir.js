(function() {
	'use strict';

	angular
		.module('sarMenu', [])
		.directive('sarMenu', function () {
			return {
				restrict: 'E',
				replace: true,
				template: [' ',
					'<div class="page-sidebar-inner slimscroll">',
					'<',
					' <ul class="menu accordion-menu">',
					'		<li ng-repeat="(key, item) in items" ng-class="{ \'active\': isActive(item.link) }">',
					'	  	<a ng-href="{{ item.link.indexOf(\'/\') === 0  ? item.link : \'#\'+item.link }}" class="waves-effect waves-button">',
					'				<span class="menu-icon glyphicon glyphicon-{{ item.icon }}"></span><p>{{ item.label }}</p>',
					'			</a>',
					'		</li>',
					'	</ul>',
					'</div>'].join(''),
				scope: '=',
				transclude: false,
				controller: function($scope, $element, $attrs, $location, $cookies) {
					var vm = this;

					$scope.items = [
						{ id: 1,
							label: 'Escritorio',
							icon: 'home',
							link: 'escritorio' }
							];

					if ($cookies.get('actions').indexOf('alta') > -1) {
						$scope.items.push({
							id: 2,
							label: 'Crear nuevo parte</p>',
							icon: 'edit',
							link: 'nuevo-parte'
						});
					}

					if ($cookies.get('actions').indexOf('consulta') > -1) {
						$scope.items.push({
							id: 3,
							label: 'Ver todos los partes',
							icon: 'search',
							link: 'partes'
						});
					}

					$scope.items.push(
							{ id: 4,
								label: 'Contactos',
								icon: 'user',
								link: 'contactos' },
							{ id: 5,
								label: 'Licencias',
								icon: 'registration-mark',
								link: 'licencias' },
							{ id: 6,
								label: 'Cerrar sesion',
								icon: 'log-in',
								link: '/salir' }
						);

					$scope.active = 1;

					$scope.isActive = function (viewLocation) {
						return '/'+viewLocation === $location.path();
					};
					// vm.active = function(id) {
					// 	console.log( window.location.href );
					// 	return $scope.active === id;
					// };
				},
				controllerAs: 'menu',
				link: function ($scope, $element, attrs) {
				}
			};
		});
})();
