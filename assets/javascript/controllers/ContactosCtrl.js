'use strict';
// =========================================================================
// Contactos Controller
// =========================================================================

ContactosCtrl.$inject = ['$scope', 'Contactos', 'Alert'];

function ContactosCtrl($scope, Contactos, Alert) {
	var vm = this;

	vm.actualizar = actualizar;

	$scope.valores = [];
	$scope.tipos = {
		'licencias': {
			'label': 'Notificaciones de licencias',
			'width': '3%'
		},
		'contable': {
			'label': 'Información contable',
			'width': '3%'
		},
		'otrasnotificaciones': {
			'label': 'Otro tipo de Notificaciones',
			'width': '4%'
		},
		'otrasalertas': {
			'label': 'Otro tipo de Alertas',
			'width': '4%'
		}
	};

	Contactos.get().$promise
		.then(collectionSuccess, collectionErrors);

	// functions
	function collectionSuccess(response) {
		$scope.listacontactos = response;
	}
	function collectionErrors(response) {
		console.log( response.data || 'Request failed' );
	}
	function actualizar() {
		Contactos.post($scope.valores).$promise
			.then(
				function(response) {
					console.log(response);
					Alert.success({
						message: 'Los contactos fueron actualizados'
					});
				},
				function(response) {
					console.log( response.data || 'Request failed' );
				}
			);
	}

}
