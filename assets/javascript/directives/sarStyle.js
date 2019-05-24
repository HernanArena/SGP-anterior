
angular
	.module('sarStyle', [])
	.directive('sarStyle', function(){
	return {
		restrict: 'A',
		scope: '@',
		link: function(scope, element, attrs){
			if (attrs.color) {
				attrs.$set('style', 'background-color: '+ attrs.color +';');
			}
		}
	};
});
