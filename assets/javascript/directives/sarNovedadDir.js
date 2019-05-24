(function() {
	'use strict';

	angular
		.module('sarNovedad', [])
		.directive('sarNovedad', ['File', function (File) {
			return {
				restrict: 'E',
				replace: true,
				template: [' ',
					'<div class="panel-body">',
					'		<div ng-show="!errors" ng-repeat="item in items">',
					'			<h4 ng-show="item.Titulo">{{ item.Titulo }}</h4>',
					'			<p>{{ item.Novedad || item.Descripcion }}</p>',
					'			<a ng-show="item.PATH" ng-href="{{item.PATH}}" class="btn btn-success btn-addon" target="_blank">',
					'				<i class="fa fa-download"></i> Descargar',
					'			</a>',
					'			<hr ng-hide="$last" />',
					'		</div>',
					'		<div ng-show="errors">',
					'			<p role="alert">{{ error_message }}</p>',
					'		</div>',
					'</div>'].join(''),
				scope: {
      		index: '@'
				},
				controller: function($scope, $attrs, File) {
					var vm = this;
					$scope.items = [];
					$scope.errors = false;
					$scope.error_message = '';

					if ($attrs.source === 'documents') {
						$scope.error_message = 'No hay documentos';
						File.documents.get().$promise
						.then(collectionSuccess, collectionErrors);
					} else {
						$scope.error_message = 'No hay novedades';
						File.news.get().$promise
						.then(collectionSuccess, collectionErrors);
					}

					function collectionSuccess (response) {
						// console.log( $attrs.source, response[0] );
						if (response.hasOwnProperty('error')) {
							$scope.errors = true;
							$scope.items = response;
						} else {
							$scope.items = response;
						}
					}
					function collectionErrors (response) {
						$scope.errors = true;
						console.log(response);
					}
				}

			};
		}]);
})();
