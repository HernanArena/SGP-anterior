(function($) {
	'use strict';

	angular
		.module('sarAttachment', ['ngResource'])
		.directive('sarAttachment', function () {
			return {
				restrict: 'E',
				replace: true,
				scope: {
					'files': '='
				},
				template: ['',
					'<div class="message-attachments" ng-show="attach.files.length > 0">',
					'	<p>',
					'		<i class="fa fa-paperclip m-r-xs"></i> {{ attach.files.length }} Adjuntos',
					'	</p>',
					'	<div ng-repeat="f in attach.files" ng-init="$last ? attach.enabledLightbox() : null" class="message-attachment">',
					// '		<a ng-href="{{ f.ruta }}" ng-class="{ \'lightbox\': attach.isImage(this, f.nombre) }" target="_self">',
					'		<sar-attachment-link link="f.ruta">',
					'			<div class="attachment-info">',
					'				<p>{{ f.nombre }}</p>',
					'				<span>{{ f.tamano }}</span>',
					'			</div>',
					'		</sar-attachment-link>',
					'	</div>',
					'</div>'].join(''),
				controllerAs: 'attach',
				controller: function ($scope, $element, $attrs) {
					var vm = this;
					vm.files = $scope.files;
					vm.enabledLightbox = enabledLightbox;
					vm.showAttach = showAttach;

					function enabledLightbox() {
						$('.lightbox').lightbox();
					}
					function showAttach(url) {
						console.log(url);
					}
				}
			};
		})
		.directive('sarAttachmentLink', function () {
			return {
				restrict: 'E',
				'replace': true,
				'scope': {
					'link': '=',
					'class': '='
				},
				transclude: true,
				template: ['',
					'<a ng-href="{{ link }}" ng-class="{{ class }}" target="_self">',
					'	<ng-transclude></ng-transclude>',
					'</a>'].join(''),
				controllerAs: 'attachlink',
				controller: function ($scope, $element, $attrs) {
					var vm = this;
					var ext = ['jpg', 'jpeg', 'png', 'bmp', 'gif'];
					var isimage = false;

					angular.forEach(ext, function(value) {
						if($scope.link.indexOf(value) > -1 ) {
							isimage = true;
						}
					});

					if(!isimage) {
						$element.attr('target', '_blank');
					} else {
						$element.addClass('lightbox');
					}

				}
			};
		});
})(jQuery);
