'use strict';
// =========================================================================
// Contactos Controller
// =========================================================================

LicenciasCtrl.$inject = ['$scope', 'Licencias', '$cookies', 'Alert', 'AlertFlash', '$window', '$location'];

function LicenciasCtrl($scope, Licencias, $cookies, Alert, AlertFlash, $window, $location) {
	var vm = this;
	var socket = io.connect();
	socket.on('connect', function() {
		// console.log('socket connect');
	});

	vm.submit = submit;
	vm.deleteAttach = deleteAttach;
	vm.updateBarProgress = updateBarProgress;

	$scope.licencia = { tiphab: '', noveda: '', direml: '', observ: '', phbpat: '' };
	$scope.attach = {};
	$scope.fileAttachProgress = [];
	$scope.fileAttachList = [];
	$scope.canDeleteFile = true;
	$scope.tipos = [];
	$scope.novedades = [];

	$scope.isValid = false;

	$scope.$watch('formLicencia.$valid', function(validity) {
		$scope.isValid = validity;
	});

	Licencias.news.get().$promise
		.then(
			function(response) {
				$scope.novedades = response;
			},
			function(response) {
				$scope.novedades = [
					{ 'CODIGO': 'LGL004', 'DESCRP': 'C.O.T. (automático)' },
					{ 'CODIGO': 'LGL003', 'DESCRP': 'Factura electrónica' },
					{ 'CODIGO': 'SQL11', 'DESCRP': 'Microsoft SQL Server 2012' },
					{ 'CODIGO': 'SQL12', 'DESCRP': 'Microsoft SQL Server 2014' },
					{ 'CODIGO': 'WIN10', 'DESCRP': 'Microsoft Windows 10-Compatible con Softland3.2 o superior' },
					{ 'CODIGO': 'WIN8', 'DESCRP': 'Microsoft Windows 8/2012-Compatible con Softland3.1 o super.' },
					{ 'CODIGO': 'LGL007', 'DESCRP': 'RG AFIP Nº 3685 - CITI Compras y CITI Ventas' },
					{ 'CODIGO': 'V30300', 'DESCRP': 'Versión 3.3' },
					{ 'CODIGO': 'V30400', 'DESCRP': 'Versión 3.4' }
				];
				console.log(response || 'Se ha producido un error');
				// Alert.error({
				// 	message: response.message || 'Se ha producido un error'
				// });
			});

	Licencias.types.get().$promise
		.then(
			function(response) {
				$scope.tipos = response;
			},
			function(response) {
				console.log(response || 'Se ha producido un error');
				// Alert.error({
				// 	message: response.message || 'Se ha producido un error'
				// });
			});

	// Alert.warning({
	// 	message: 'Para solicitar la habilitación correspondiente recuerde previamente comunicarse con el área de Soporte Técnico a <a href="mailto:soportear@softland.com.ar">soportear@softland.com.ar</a> o telefónicamente al 4789-7676.'
	// });

	function submit() {
		// Detallo los campos:
		// tiphab = Tipo de habilitacion
		// noveda = Codigo de Novedad
		// direml = Dirección de email
		// observ = Observaciones
		// phbpat = Path al archivo de habilitacion

		$scope.isValid = false;
		// Initialize instances:
		if ($scope.attach.file) {
			$scope.canDeleteFile = false;
			var totalAttach = $scope.attach.file.length;
			var fileAttachPath = [];
			// var socket = io.connect();
			// // var socket = io.connect('http://localhost:8080');
			// socket.on('connect', function() {
			// 	console.log('socket connect');
			// });
			var siofu = new SocketIOFileUpload(socket);
			var date = new Date();
			var directory = $cookies.get('username') + '/' + date.getTime();

			// Configure the three ways that SocketIOFileUpload can read files:
			// document.getElementById('upload_btn').addEventListener('click', siofu.prompt, false);
			siofu.listenOnInput(document.getElementById('fileattach'));
			// siofu.listenOnDrop(document.getElementById('file_drop'));

			siofu.addEventListener('start', function(event){
    		event.file.meta.dest = directory;
				console.log('[Cliente] inside start: ', event);
			});

			siofu.addEventListener('progress', function(event){
				var percent = event.bytesLoaded / event.file.size * 100;
				vm.updateBarProgress(event.file.progressId, percent.toFixed(2));
			});

			// Do something when a file is uploaded:
			siofu.addEventListener('complete', function(event){
				// console.log('[Client] Complete: ', event.success, event.file);
				// console.log('[Client] Complete: ', event.detail.pathName);
				fileAttachPath.push(event.detail.pathName);
				totalAttach--;

				// Verificar si se subieron todos los archivos
				if (totalAttach === 0) {
					siofu.destroy();
					// fileAttachPath;
					$scope.licencia.phbpat = directory;
					Licencias.save.post({habilitacion: $scope.licencia}).$promise.then(submitSuccess, submitErrors);
				}
			});
			siofu.submitFiles( $scope.attach.file );

		} else {
			Licencias.save.post({habilitacion: $scope.licencia}).$promise.then(submitSuccess, submitErrors);
		}
	}

	function submitSuccess(response) {
		// initialize($scope);
		$scope.licencia = {};
		$scope.attach = {};
    $scope.formLicencia.$setPristine();
    $scope.formLicencia.$setValidity();
    $scope.formLicencia.$setUntouched();

		// Alert.success({
		// 	message: ''
		// });
		AlertFlash.set('Los datos se enviaron correctamente');
		// $window.location.href = '/#/escritorio';
		$location.path('/escritorio');
	}

	function submitErrors(response) {
		$scope.isValid = true;
		Alert.error({
			title: 'Error',
			message: 'Se produjo un error procesando la solicitud. Verifique en el archivo de licencias que los códigos de Cliente y Sucursal sean correctos.'
		});
		console.log(response);
	}

	function deleteAttach (index) {
		$scope.attach.file.splice(index, 1);
	}

	function updateBarProgress(progressId, percent) {
		$scope.$apply(function() {
			$scope.fileAttachProgress[progressId] = parseFloat(percent);
		});
	}

}
