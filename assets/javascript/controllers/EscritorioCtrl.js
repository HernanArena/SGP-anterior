'use strict';
// =========================================================================
// Partes Controller
// =========================================================================

EscritorioCtrl.$inject = ['$scope', 'Partes', 'File', '$location', '$cookies', 'Alert', 'AlertFlash'];

function EscritorioCtrl($scope, Partes, File, $location, $cookies, Alert, AlertFlash) {
	var vm = this;
	var socket = io.connect();

	vm.abrirParte = abrirParte;
	vm.subirArchivo = subirArchivo;
	vm.updateBarProgress = updateBarProgress;
	vm.enabledLightbox = enabledLightbox;
	vm.deleteFiles = deleteFiles;
	vm.loadFiles = loadFiles;
	vm.iconFormat = iconFormat;
	vm.canIUse = canIUse;

	Partes.last().$promise
		.then(collectionSuccess, collectionErrors);

	$scope.flash = AlertFlash.get();

	$scope.loaded = false;
	$scope.fileAttachProgress = [];
	$scope.attach = {
		file: [],
		delete: [],
		fileprogress: 0
	};
	$scope.inprocess = false;
	$scope.$watch('attach.file.length', function(newvalue, oldvalue) {
		if (newvalue && !$scope.inprocess) {
			$scope.inprocess = true;
			vm.subirArchivo();
		}
	});

	vm.loadFiles();

	// functions
	function loadFiles() {
		$scope.attach.file = [];
		File.intercambioarchivos.get().$promise
			.then(fileSuccess, fileErrors);
	}

	function compare(a, b) {
		var aparts = a.fecha.split('/');
		var bparts = b.fecha.split('/');
		var afecha = new Date(aparts[2],aparts[1],aparts[0]);
		var bfecha = new Date(bparts[2],bparts[1],bparts[0]);

		if (afecha < bfecha) {
		  return -1;
		}
		if (afecha > bfecha) {
		  return 1;
		}
		return 0;
	}
	function collectionSuccess(response) {
		$scope.partes = [];
		response.map(function(parte) {
			$scope.partes.push(parte);
		});
		$scope.loaded = true;

		Partes.count().$promise
			.then(
				function(response) {
					$scope.pendientes = response[0].PENDIENTES_ACCION;
					$scope.abiertos = response[0].ABIERTOS;
				},
				function(response) {
					console.log( response.message || 'Request failed' );
				});
	}

	function collectionErrors(response) {
		// console.log( response.data || 'Request failed' );
	}

	function fileSuccess(response) {
		$scope.intercambioarchivos = response;
	}

	function fileErrors(response) {
		console.log( response );
	}

	function abrirParte(parte) {
		$location.path('parte/' + angular.lowercase(parte.codigo).replace(' ', '') );
	}

	function subirArchivo() {
		var totalAttach = 0;
		var fileAttachPath = [];
		var siofu = new SocketIOFileUpload(socket);

			// Configure the three ways that SocketIOFileUpload can read files:
			// document.getElementById('upload_btn').addEventListener('click', siofu.prompt, false);
			// siofu.listenOnDrop(document.getElementById('file_drop'));

		siofu.listenOnInput(document.getElementById('fileattach'));

		siofu.addEventListener('start', function(event){
			totalAttach = $scope.attach.file.length;
			fileAttachPath = [];
			event.file.meta.dest = $cookies.get('username') + '/intercambio/';
			console.log('[Cliente] inside start: ', event);
		});

		siofu.addEventListener('progress', function(event){
			var percent = event.bytesLoaded / event.file.size * 100;
			vm.updateBarProgress(event.file.progressId, percent.toFixed(2));
		});
		siofu.addEventListener('complete', function(event){
			fileAttachPath.push(event.detail.pathName);
			totalAttach--;

			if (totalAttach === 0) {
				Alert.success({
					message: 'El archivo se cargó correctamente'
				});
				vm.loadFiles();
			}
		});
		siofu.submitFiles( $scope.attach.file );
	}

	function updateBarProgress(progressId, percent) {
		$scope.$apply(function() {
			$scope.fileAttachProgress[progressId] = parseFloat(percent);
		});
	}

	function enabledLightbox() {
		$('.lightbox').lightbox();
	}

	function deleteFiles() {
		var deleted = [];
		var total = 0;
		$scope.attach.delete.map(function(value, index) {
			// console.log(index, value);
			if (value) {
				total++;
				File.intercambioarchivosdelete.delete({file: $scope.intercambioarchivos[index].name }).$promise
					.then(function(response) {
						deleted.push(response[0].file);
						$scope.intercambioarchivos.splice(index, 1);
						if (deleted.length === total) {
							Alert.success({
								message: 'Se eliminaron los archivos: '+ deleted.join(', ')
							});
						}
					}, function(response) {
						console.log(response);
					});
			}
		});

		$scope.attach.delete = [];

	}

	function iconFormat(filename) {
		return '';
	}

	function canIUse(arg) {
		var actions = $cookies.get('actions').split(',');
		return actions.indexOf(arg) > -1;
	}

}
