'use strict';
// =========================================================================
// Login Controller
// =========================================================================

LoginCtrl.$inject = ['$scope', 'Usuario', '$window', 'Alert', '$location'];

function LoginCtrl($scope, Usuario, $window, Alert, $location) {
	var vm = this;

	vm.submit = submit;
	vm.sendPassword = sendPassword;
	vm.toogleForgot = toogleForgot;
	// var url = '/#' + hash.join('/');
	// console.log(url);

	$scope.isValid = false;
	$scope.loginFault = false;
	$scope.showForgot = false;
	$scope.forgotMessage = '';
	$scope.forgotClass = '';
	$scope.errorMessage = 'Usuario o clave incorrecta_X';
	$scope.showForgotLabel = function() {
		return $scope.showForgot ? 'Volver al login' : '¿Olvidó su contraseña?';
	};

	$scope.$watch('formLogin.$valid', function(validity) {
		$scope.isValid = validity;
	});

	function submit() {
		$scope.isValid = false;
		$scope.loginFault = false;

		Usuario.login.post({uid: $scope.user.uid, pwd: $scope.user.pwd}).$promise
			.then(collectionSuccess, collectionErrors);
	}

	function collectionSuccess (response) {
		// $scope.isValid = true;
		if (response.error) {
			$scope.isValid = true;
			$scope.loginFault = true;
		} else {
			var path = $location.$$path;

			if (path) {
				$window.location.href = '/#' + path;
			} else {
				$window.location.href = '/';
			}
		}
	}
	function collectionErrors (response) {
		$scope.isValid = true;
		$scope.loginFault = true;
		$scope.errorMessage = response.data.error || 'Usuario o clave incorrecta_X';
	}

	function toogleForgot () {
		$scope.showForgot = !$scope.showForgot;
	}

	function sendPassword () {
		var uid = $scope.user.uid;
		$scope.user.uid = '';

		Usuario.reset(uid).get().$promise
			.then(
				function(response) {
					if (response.error) {
						$scope.forgotMessage = response.hasOwnProperty('message') ? response.message : 'Usuario incorrecto';
						$scope.forgotClass = 'error';
					} else {
						$scope.forgotMessage = response.hasOwnProperty('message') ? response.message : 'La clave se envió satisfactoriamente';
						$scope.forgotClass = 'success';
					}
				},
				function(response) {
						$scope.forgotMessage = response.hasOwnProperty('message') ? response.message : 'Ocurrió un error. Intente';
						$scope.forgotClass = 'error';
				});
	}

}
