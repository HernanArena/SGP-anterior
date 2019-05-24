/**
* sarTitle Module
*
* Description
*/

angular.module('sarTitle', [])
	.directive('sarTitle', ['$location', function ($location) {
		return {
			restrict: 'E',
			replace: true,
			scope: '=',
			template: ['<div class="page-title">',
								'	<h3>{{ mainTitle }}</h3>',
								'	<div class="page-breadcrumb">',
								'		<ol class="breadcrumb">',
								'			<li><a href="#escritorio">Inicio</a></li>',
								'			<li ng-repeat="crumb in breadcrumbTitle" ng-class="{ active: $last }">{{ crumb }}</li>',
								'		</ol>',
								'</div>'].join(''),
			transclude: false,
			controller: function ($scope, $element, $attrs, $location) {
				var vm = this;

				vm.getPath = getPath;

				$scope.breadcrumbTitle = $scope.mainTitle;
				$scope.$watch(function(){ return $location.path() }, function(new_value){
					vm.getPath(new_value);
				});

				function getPath(argument) {
					// var path = argument.replace('/', '');
					var path = [],
							paths = argument.split('/');
					paths.shift();
					// paths.map(capitalizeFirstLetter);
					angular.forEach(paths, function (item) {
						path.push( capitalizeFirstLetter(item) );
					});
					$scope.mainTitle = path.join(' ');
					$scope.breadcrumbTitle = path;
				}
				function capitalizeFirstLetter(string) {
					return string.charAt(0).toUpperCase() + string.slice(1).replace('-', ' ');
				}
				// String.prototype.capitalize = function() {
				// 	return this.charAt(0).toUpperCase() + this.slice(1);
				// };
			},
			controllerAs: 'ttl'
		};
	}]);
