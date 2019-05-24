(function() {
	'use strict';

	angular
		.module('sarUserData', ['ngResource'])
		.directive('sarUserData', ['Usuario', function (User) {
			return {
				restrict: 'A',
				controllerAs: 'userctrl',
				controller: function ($scope, Usuario) {
					var vm = this;
					$scope.hasLastLogin = hasLastLogin;
					$scope.getLogo = getLogo;
					$scope.getAvatar = getAvatar;

					$scope.user = Usuario;

					function getLogo() {
						var logo = '';
						// if ($scope.user.empresa.logo === ' ') {
						// 	logo = 'assets/images/logo_default.png';
						// } else {
							logo = 'http://www.softland.com.ar/wp-content/themes/softland/lib/clientes/core/uploads/'+ $scope.user.username.toLowerCase() +'.jpg';
						// }
						return logo;
					}

					function getAvatar() {
						return 'assets/images/avatar1.png';
					}

					// function getlastLogin() {
					// 	if (isDate($scope.user.lastLogin)) {
					// 		return '';
					// 	}
					// 	return $scope.user.lastLogin;
					// }

					function hasLastLogin() {
						return $scope.user.lastLogin !== '';
					}

					function isDate(date) {
						return ( (new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) ));
					}
				}
			};
		}]);
})();
