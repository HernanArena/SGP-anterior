'use strict';
// =========================================================================
// Parte Controller
// =========================================================================

ParteCtrl.$inject = ['$scope', 'Parte', '$location', 'Alert', '$cookies', '$window', '$anchorScroll'];

function ParteCtrl($scope, Parte, $location, Alert, $cookies, $window, $anchorScroll) {
	var vm = this;
	var path = $location.path().split('/');
	// $location.hash('top');
	// $anchorScroll();

	vm.updateBarProgress = updateBarProgress;
	vm.dateParse = dateParse;
	vm.monthToDay = monthToDay;
	vm.collapse = collapse;

	// $scope.closeTicket = closeTicket;
	$scope.deleteAttach = deleteAttach;
	$scope.sendTicket = sendTicket;
	// $scope.dataticket = {
	// 	description: '',
	// 	ratio: 0
	// };
	// $scope.dataanswer = {
	// 	description: '',
	// 	files: []
	// };
	$scope.data = {};
	$scope.attach = {
		file: []
	};
	$scope.fileAttachProgress = [];
	$scope.fileAttachList = [];
	$scope.canDeleteFile = true;
	$scope.ticket = {
		nrocta: path[2],
		nrofor: path[3],
		estnew: false,
		description: ''
	};
	$scope.canIUse = canIUse;

	// $scope.$watchCollection('parte', function(newvalue) {
	// 	console.log(newvalue);
	// });

	Parte.get({ nrocta: path[2], nrofor: path[3] }).$promise
		.then(collectionSuccess, collectionErrors);

	// functions
	function collectionSuccess(response) {
		var parte = {
			codfor: path[2],
			nrofor: path[3],
			desest: response.desest,
			desfun: response.desfun,
			fchmov: response.fchmov,
			estado: response.estado,
			historial: [{
				observaciones: response.desfun,
				userUltAct: 'Cliente',
				adjuntos: '',
				fecha: response.fchmov,
				fechaorder: vm.dateParse(response.fchmov, 'm/d')
			}],
			actions: []
		};

		$scope.data = parte;

		if ($cookies.empresa_name !== 'Softland' && parte.estado ===  '005CLI') {
			Alert.warning({
				container: '#warningContainer',
				title: 'Estimado Cliente',
				message: 'este Parte requiere una acción de su parte. Por favor lea detenidamente nuestra respuesta.'
			});
		}

		Parte.history({ nrocta: path[2], nrofor: path[3] }).$promise
			.then(function(historyresp) {
				historyresp.reverse().map(function(obj, index) {
					if (obj.observaciones !== null) {
						$scope.data.historial.push({
							observaciones: obj.observaciones,
							area: obj.area,
							adjuntos: obj.adjuntos,
							fecha: obj.fecha,
							userUltAct: obj.area,
							fechaorder: vm.dateParse(obj.fecha)
						});
					}
				});
				$scope.data.historial.reverse();
			}, collectionErrors);

		Parte.actions({ nrocta: path[2], nrofor: path[3] }).$promise
			.then(function(actionallow) {
				actionallow.map(function(obj, index) {
					obj.icon = 'fa fa-'+ (obj.hasOwnProperty('estadoIcono') && obj.estadoIcono !== '' ? obj.estadoIcono : 'reply');
					obj.color = (obj.hasOwnProperty('estadoColor') && obj.estadoColor !== '' ? 'background: '+obj.estadoColor+' !important' : '');
					$scope.data.actions.push(obj);
				});
				//
				window.scrollTo(0, 0);
			}, collectionErrors);
	}

	function dateParse(date, format) {
		var part = date.split('/');
		var d = '';
		if (typeof format === 'undefined') {
			d = new Date(part[2], part[1], part[0]);
		} else {
			d = new Date(part[2], part[0], part[1]);
		}
		return d.valueOf();
	}

	function monthToDay(date) {
		var part = date.split('/');
		return part[1] +'/'+ part[0] +'/'+ part[2];
	}

	// $scope.$watchCollection('parte', function(newvalue, oldvalue) {
	// 	console.log(newvalue);
	// });

	function collectionErrors(response) {
		// console.log( response || 'Request failed' );
	}
	// function closeTicket() {
	// 	console.log('Send closeTicket: controller ParentCtrl');
	// 	console.log( $scope.dataticket );
	// }
	function sendTicket() {
		var json = {
			estnew: $scope.ticket.estnew,
			obscli: $scope.ticket.description + ($scope.ticket.ratio ? ' (Calificación: '+ $scope.ticket.ratio+')' : ''),
			adjunt: ''
		};

		// console.log( $scope.dataanswer );
		if ($scope.attach.file.length) {
			var socket = io.connect();
			socket.on('connect', function() {
				// console.log('socket connect');
			});
			var totalAttach = $scope.attach.file.length;
			var fileAttachPath = [];
			var siofu = new SocketIOFileUpload(socket);
			var date = new Date();
			var directory = $cookies.get('username') +'/'+ date.getTime() +'/';

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

			siofu.addEventListener('complete', function(event){
				fileAttachPath.push(event.detail.pathName);
				totalAttach--;

				if (totalAttach === 0) {
					// siofu.destroy();
					json.adjunt = directory;
					Parte.post({nrocta: path[2], nrofor: path[3]}, {parte: json}).$promise
						.then(submitSuccess, submitErrors);
				}
			});
			//
			siofu.submitFiles( $scope.attach.file );
		} else {
			Parte.post({nrocta: path[2], nrofor: path[3]}, {parte: json}).$promise.then(submitSuccess, submitErrors);
		}
	}

	function submitSuccess(response) {
		$scope.fileAttachProgress = [];
		$scope.ticket = {};
		$scope.attach = {};
		$scope.showratio = false;
    angular.element('#actions').hide();

		Alert.success({
			message: response.hasOwnProperty('message') ? response.message : 'Los datos se enviaron correctamente'
		});
	}

	function submitErrors(response) {
		$scope.isValid = true;
		Alert.error({
			title: 'Error',
			message: 'No se pude enviar los datos. Por favor intente nuevamente en unos minutos.'
		});
	}

	function deleteAttach(index) {
		$scope.attach.file.splice(index, 1);
	}

	function updateBarProgress(progressId, percent) {
		$scope.$apply(function() {
			$scope.fileAttachProgress[progressId] = parseFloat(percent);
		});
	}

	function canIUse(arg) {
		var actions = $cookies.get('actions').split(',');
		return actions.indexOf(arg) > -1;
	}

	function collapse(action, desc) {
		$scope.showratio = false;
		$('#response').slideToggle('fast', function() {
			$scope.$apply(function () {
				if($('#response').is(':visible')) {
					$scope.ticket.estnew = action.CODIGO;
					$scope.showratio = action.DESCRP === 'Cerrar';
					$("#valoracion").rating({'size':'xs'});
				} else {
					$scope.ticket.estnew = false;
					$scope.ticket.description = '';
					if ($scope.attach.file.length) {
						$scope.attach.file.splice(0, $scope.attach.file.length);
					}
				}
			});
		});
	}

}
