;(function($, window, undefined) {
	'use strict';

	angular
		.module('loginApp', [
			'angular-jwt',
			'ml-alert',
			'ngAnimate',
			'ngMessages',
			'ngResource',
			'ngCookies',
			// 'sarAlert'
		])
    .constant('URL_API', configData.url_api)
		.config(function (AlertProvider) {
			AlertProvider
				.setOptions({
					container: '#alertContainer'
				});
		})
		.controller('LoginController',
			LoginCtrl)
		.factory('Usuario',
			UsuarioFactory);

	angular
		.module('sarApp', [
				'angular-jwt',
				'datatables',
				'fileread',
				// 'sarAlert',
				'sarAttachment',
				'sarAvatar',
				'sarBtnCollapse',
				'sarCollapse',
				'sarFilesize',
				'sarHref',
				'sarMenu',
				'sarNovedad',
				'sarParteLink',
				'sarStatus',
				'sarStyle',
				'sarResponsiveTable',
				'sarTitle',
				'sarUserData',
				'ml-alert',
				'ngAnimate',
				'ngCookies',
				'ngMessages',
				'ngResource',
				'ngRoute',
				'tooltip'
			])
		.factory('Usuario', UsuarioFactory)
		.factory('Partes', PartesService)
		.factory('File', FileService)
		.factory('Parte', ParteService)
		.factory('Nuevo', NuevoService)
		.factory('Licencias', LicenciasService)
		.factory('Contactos', ContactosService)
		.provider('date', dateProvider)
		.controller('EscritorioController', EscritorioCtrl)
		.controller('PartesController', PartesCtrl)
		.controller('ParteController', ParteCtrl)
		.controller('ContactosController', ContactosCtrl)
		.controller('LicenciasController', LicenciasCtrl)
		.controller('NuevoParteController', NuevoParteCtrl)
		.controller('UsuarioController', UsuarioCtrl)
		.filter('filtroEstados',
			function () {
				return function (items, search) {
					if (typeof search === 'string') {
						var expected = ('' + search).toLowerCase();
						var result = [];
						var state = '';
						angular.forEach(items, function(value, key) {
							state = value.estado_cod.toLowerCase();
							if (state === expected) {
								result.push(value);
							}
						});
						return result;
					} else {
						return items;
					}
					// console.log(typeof search);
					// if (typeof search === 'string') {
					// 	var expected = ('' + search).toLowerCase();
					// 	var result = [];
					// 	var state = '';
					// 	console.log('Filtrar: '+expected);
					// 	angular.forEach(items, function(value, key) {
					// 		state = value.historial[0].estado.descripcion.toLowerCase();
					// 		if (state === expected) {
					// 			result.push(value);
					// 		}
					// 	});
					// 	return result;
					// } else {
					// 	console.log('No filtrar');
					// 	return items;
					// }
				};
			})
    .value('version', '1.0')
    .constant('URL_API', configData.url_api)
		.config(['dateProvider', function (dateProvider) {
			// console.log(dateProvider);
		}])
		.config(['$sceDelegateProvider', function($sceDelegateProvider) {
			$sceDelegateProvider.resourceUrlWhitelist(['self', configData.url_api+'/**']);
		}])
		.config(routeConfig)
		.config(alertConfig)
		.run(configureDefaults);

		function configureDefaults(DTDefaultOptions, $rootScope, $location) {
			DTDefaultOptions.setLanguage({
				sProcessing:     'Procesando...',
				sLengthMenu:     'Mostrar _MENU_ registros',
				sZeroRecords:    'No se encontraron resultados',
				sEmptyTable:     'Ningún dato disponible en esta tabla',
				sInfo:           'Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros',
				sInfoEmpty:      'Mostrando registros del 0 al 0 de un total de 0 registros',
				sInfoFiltered:   '(filtrado de un total de _MAX_ registros)',
				sSearch:         'Buscar:',
				sInfoThousands:  ',',
				sLoadingRecords: 'Cargando...',
				loadingRecords: 'Cargando...',
				oPaginate: {
					sFirst:    'Primero',
					sLast:     'Último',
					sNext:     'Siguiente',
					sPrevious: 'Anterior'
				},
				oAria: {
					sSortAscending:  ': Activar para ordenar la columna de manera ascendente',
					sSortDescending: ': Activar para ordenar la columna de manera descendente'
				}
			});

			var history = [];
			$rootScope.$on('$routeChangeSuccess', function() {
				history.push($location.$$path);
			});
			$rootScope.back = function () {
				var prevUrl = history.length > 1 ? history.splice(-2)[0] : "/";
				$location.path(prevUrl);
			};

			// var socket = io.connect();
			// socket.on('connect', function() {
			// 	console.log('socket connect');
			// });
		}

		function routeConfig ($routeProvider) {
			$routeProvider
				.when('/escritorio', {
					templateUrl: '/views/escritorio.html',
					controller: 'EscritorioController',
					controllerAs: 'escritorio',
					routeName: 'Escritorio'
				})
				.when('/partes', {
					templateUrl: 'views/partes.html',
					controller: 'PartesController',
					controllerAs: 'partes',
					routeName: 'Partes'
				})
				.when('/parte/:code/:num', {
					templateUrl: 'views/parte.html',
					controller: 'ParteController',
					controllerAs: 'parte',
					routeName: 'Parte'
				})
				.when('/', {
					templateUrl: 'http://localhost:4200',
					controller: 'NuevoParteController',
					controllerAs: 'partes',
					routeName: 'Nuevo'
				})
				.when('/contactos', {
					templateUrl: 'views/contactos.html',
					controller: 'ContactosController',
					controllerAs: 'contactos',
					routeName: 'Contactos'
				})
				.when('/licencias', {
					templateUrl: 'views/licencias.html',
					controller: 'LicenciasController',
					controllerAs: 'licencias',
					routeName: 'Licencias'
				})
				.when('/404', {
					templateUrl: 'views/404.html'
				})
				.otherwise({
					redirectTo: '/escritorio',
					resolve: {
						factory: checkRouting
					}
				});
		}

		function alertConfig (AlertProvider) {
			AlertProvider
				.setOptions({
					container: '#alertContainer'
				});
		}

		var checkRouting= function ($q, $cookies, $window) {
			// if (!$cookies.get('token') ) {
			// 	$window.location.href = '/#escritorio';
			// } else {
			// 	$window.location.href = '/login';
			// }
		};

})(jQuery, window);
