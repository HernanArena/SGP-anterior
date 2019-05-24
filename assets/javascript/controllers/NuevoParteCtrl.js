'use strict';
// =========================================================================
// Nuevo Parte Controller
// =========================================================================

NuevoParteCtrl.$inject = ['$scope', 'Nuevo', '$location', 'Alert', '$cookies'];

function NuevoParteCtrl($scope, Nuevo, $location, Alert, $cookies) {
	var vm = this;

	vm.submit = submit;
	vm.updateBarProgress = updateBarProgress;

	$scope.deleteAttach = deleteAttach;
	$scope.ticket = {};
	$scope.attach = {};
	// $scope.isValid = false;
	$scope.fileAttachProgress = [];
	$scope.fileAttachList = [];
	$scope.canDeleteFile = true;

	$scope.versions = [];
	$scope.contacts = [];

	$scope.$watch('formNewTicket.$valid', function(validity) {
		$scope.isValid = validity;
	});

	// Alert.warning({
	// 	container: '#alertContainer',
	// 	title: 'IMPORTANTE:',
	// 	message: 'Si usted ya ha creado un Parte por la consulta que desea reportar, le sugerimos aguardar respuesta del equipo de Soporte o Responder la cadena de mensajes asociada al Parte que ya ha abierto.'
	// });

	Nuevo.contactos.get().$promise
		.then(
			function(response) {
				$scope.contacts = response;

				Nuevo.versiones.get().$promise
					.then(
						function(response) {
							$scope.versions = response;
						},
						function(response) {
							console.log(response || 'Request failed');
						});
			},
			function(response) {
				console.log(response || 'Request failed');
			});

	function collectionSuccess (response) {
		angular.forEach(response.versiones, function(val) {
			$scope.versions.push(val);
		});
		angular.forEach(response.contactos, function(val) {
			$scope.contacts.push(val);
		});
	}

	function collectionErrors (response) {
		console.log('Request failed');
	}

	function submit (e) {
		$scope.isValid = false;
		var json = {
			versio: $scope.ticket.version,
			userid: $scope.ticket.contact,
			descrp: $scope.ticket.description
		};
		// Initialize instances:
		if ($scope.attach.hasOwnProperty('file')) {
			var socket = io.connect();
			socket.on('connect', function() {
				// console.log('socket connect');
			});
			var totalAttach = $scope.attach.file.length;
			var fileAttachPath = [];
			var siofu = new SocketIOFileUpload(socket);
			var date = new Date();
			var directory = $cookies.get('username') +'/'+ date.getTime() +'/';

			$scope.canDeleteFile = false;
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
					json.adjunt = directory;
					Nuevo.save.post({parte: json}).$promise.then(submitSuccess, submitErrors);
				}
			});
			siofu.submitFiles( $scope.attach.file );

		} else {
			Nuevo.save.post({parte: json}).$promise.then(submitSuccess, submitErrors);
		}
	}

	// function createSuccess (response) {
	// 	$location.path('partes');
	// }
	// function createErrors (response) {
	// 	console.log('Error');
	// }

	function submitSuccess(response) {
		var codfor, nrofor;
		$scope.fileAttachProgress = [];
		$scope.ticket = {};
		$scope.attach = {};
    // $scope.formNewTicket.$setPristine();
    // $scope.formNewTicket.$setValidity();
    // $scope.formNewTicket.$setUntouched();
    angular.element('#formNewTicket').hide();

    if (response.length) {
    	codfor = response[0].CODFOR;
    	nrofor = response[0].NROFOR;
    }
		Alert.success({
			message: 'El parte se creó correctamente ' + (
				codfor !== '' ?
					' con el código <a href="/#/parte/'+codfor+'/'+nrofor+'">'+codfor+' '+nrofor+'</a>' :
					''
			)
		});
	}
	function submitErrors(response) {
		$scope.isValid = true;
		Alert.error({
			title: 'Error',
			message: 'No se pude enviar los datos. Por favor intente nuevamente en unos minutos.'
		});
		console.log(response);
	}

	function deleteAttach (index) {
		console.log($scope.attach.file);
		console.log(index);
		$scope.attach.file.splice(index, 1);
	}

	function updateBarProgress(progressId, percent) {
		$scope.$apply(function() {
			$scope.fileAttachProgress[progressId] = parseFloat(percent);
		});
	}

}
