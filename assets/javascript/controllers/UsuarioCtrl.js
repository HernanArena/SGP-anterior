'use strict';
// =========================================================================
// Parte Controller
// =========================================================================

UsuarioCtrl.$inject = ['$scope', 'Usuario', '$cookies'];

function UsuarioCtrl($scope, Usuario, $cookies) {
	var vm = this;
	$scope.user = Usuario;

	Usuario.logo.get({code: $cookies.get('username')}).$promise
		.then(function(response) {

		}, function(response) {

		});

}
