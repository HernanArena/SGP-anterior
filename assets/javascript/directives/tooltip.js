
angular
	.module('tooltip', [])
	.directive('tooltip', function(){
	return {
		restrict: 'A',
		link: function(scope, element, attrs){
			$(element).hover(function(){
				$(element).tooltip('show');
			}, function(){
				$(element).tooltip('hide');
			});
		}
	};
});
