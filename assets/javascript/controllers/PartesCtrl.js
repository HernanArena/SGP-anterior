// =========================================================================
// Partes Controller
// =========================================================================

PartesCtrl.$inject = ['$scope', 'Partes', '$location', 'DTOptionsBuilder', 'DTColumnDefBuilder', '$filter'];

function PartesCtrl($scope, Partes, $location, DTOptionsBuilder, DTColumnDefBuilder, $filter) {
	var vm = this;

	vm.limitDescription = 80;

	vm.abrirParte = abrirParte;

	vm.dtOptions = DTOptionsBuilder.newOptions().withOption('order', [0, 'desc']); //DTOptionsBuilder;

	vm.dtColumnDefs = [
		DTColumnDefBuilder.newColumnDef(0),
		DTColumnDefBuilder.newColumnDef(1),
		DTColumnDefBuilder.newColumnDef(2),
		DTColumnDefBuilder.newColumnDef(3),
		DTColumnDefBuilder.newColumnDef(4).notSortable(),
		DTColumnDefBuilder.newColumnDef(5).notSortable(),
		DTColumnDefBuilder.newColumnDef(6).notSortable()
	];

	vm.dtInstance = {};

	vm.reloadData = reloadData;

	vm.getDescription = getDescription;

	vm.reload = function(event) {
		// vm.dtInstance.reloadData();
	};

	vm.formatDate = formatDate;

	vm.listEstados = []; //['Nuevo', 'Cerrado', 'Esperando respuesta', 'Requiere acción'];

	$scope.loaded = false;
	$scope.sourceComplete = [];
	$scope.$watch('estado', function(newvalue, oldvalue) {
		if (newvalue !== oldvalue) {
			$scope.sourceTable = $filter('filtroEstados')($scope.sourceComplete, newvalue);
			// vm.dtInstance.rerender();
		}
	});

	Partes.get().$promise
		.then(collectionSuccess, collectionErrors);

	function reloadData() {
		vm.dtInstance.reloadData();
	}
	function abrirParte(parte) {
		$location.path('parte/' + angular.lowercase(parte.codigo).replace(' ', '') );
	}
	function collectionSuccess(response) {
		// response.map(function(parte) {
		// 	$scope.sourceComplete.push(parte);
		// });
		$scope.sourceComplete = response;

		$scope.sourceTable = $scope.sourceComplete;
		$scope.loaded = true;

		Partes.state().$promise
			.then(
				function(resp) {
					vm.listEstados = resp;
				},
				function(resp) {
					console.log( resp.message || 'Request failed' );
				});
	}
	function collectionErrors(response) {
		$scope.loaded = true;
		console.log( response.message || 'Request failed' );
	}
	function getDescription(text, textComplete) {
		var returnText = !textComplete ? text.substring(19) : text;
		return returnText.length > vm.limitDescription ? $filter('limitTo')(returnText, vm.limitDescription) + '...' : returnText;
	}
	function formatDate(date) {
		var d = date.split('/');
		return d[2]+d[1]+d[0];
	}

}
