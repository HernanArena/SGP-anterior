(function() {
	'use strict';

	angular
		.module('fileread', [])
		.directive('fileread', ['Alert', function (Alert) {
			return {
				scope: {
					fileread: '='
				},
				link: function (scope, element, attrs) {
					var indexbase = 0;
					var totalsize = 0;
					var limit = 50 * 1024 * 1024;
					// document.getElementById(dropZoneId).addEventListener("dragover",
					element.bind('change', function (changeEvent) {
						// console.log( changeEvent.target.files );
						// console.log(document.getElementById('fileattach').files);
						// console.log(document.getElementById('fileattach').files[0].size);
						if (!scope.fileread) {
							scope.fileread = [];
						} else {
							indexbase = scope.fileread.length;
						}
						angular.forEach(changeEvent.target.files, function(file, index) {
							file.progressId = indexbase + index;
							totalsize += file.size;

							if (totalsize < limit) {
								scope.fileread.push(file);
							} else {
								Alert.error({
									message: 'El archivo a superado el límite. El peso máximo soportado es de 50Mb'
								});
								totalsize = 0;
							}
						});
						scope.$apply('fileread');
					});
				}
			};
		}]);
})();
