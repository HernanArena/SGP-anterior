//
angular.module('ml-alert',[])
	.provider('Alert', function() {

		this.options = {
			delay: 5000,
			replaceMessage: true,
			container: 'body',
			templateUrl: 'alertProvider.html',
		};

		this.setOptions = function(options) {
			if (!angular.isObject(options)) {
				throw new Error('Options should be an object!');
			}
			this.options = angular.extend({}, this.options, options);
		};

		this.$get = function($timeout, $http, $compile, $templateCache, $q, $rootScope, $sce, $document) {
			var options = this.options;
			var messageElements = [];

			var alert = function(args, type) {
        var deferred = $q.defer();

				if (typeof args !== 'object') {
					args = { message:args };
				}

				args.container = args.container ? args.container : options.container;
				args.scope = args.scope ? args.scope : $rootScope;
				args.template = args.templateUrl ? args.templateUrl : options.templateUrl;
				args.replaceMessage = args.replaceMessage || options.replaceMessage;

				$http.get(args.template,{cache: $templateCache})
					.success(function(template) {
						var scope = args.scope.$new();
						var templateElement = $compile(template)(scope);

						// Find and close open messages
						if (args.replaceMessage) {
							for (var i = messageElements.length - 1; i >= 0; i--) {
								angular.element(messageElements[i]).alert('close');
							}
						}

            $document.find( args.container ).append(templateElement);

						scope.message = $sce.trustAsHtml(args.message);
						scope.title = $sce.trustAsHtml(args.title);
						scope.type = type; //.substr(0,1);
						scope._templateElement = templateElement;

						messageElements.push(templateElement);

						deferred.resolve(scope);
					})
					.error(function(data){
						throw new Error('Template ('+args.template+') could not be loaded. ' + data);
					});
			};

			alert.success = function(args) {
				return this(args, 'success');
			};
			alert.warning = function(args) {
				return this(args, 'warning');
			};
			alert.info = function(args) {
				return this(args, 'info');
			};
			alert.error = function(args) {
				return this(args, 'danger');
			};

			return alert;
		};

	})

	.factory('AlertFlash', ['$rootScope', function ($rootScope) {
		var queue = [],
				flashMessage = '';

		// $rootScope.$on('$routeChangeSuccess', function() {
		// 	if (queue.length > 0) {
		// 		flashMessage = queue.shift();
		// 	} else {
		// 		flashMessage = '';
		// 	}
		// });

		return {
		  set: function(message) {
		    queue.push(message);
		  },
		  get: function() {
		    return queue.shift();
		  }
		};
	}])

	.directive('mlAlert', ['Alert', function(Alert) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				'type': '=',
				'message': '=',
				'title': '='
			},
			link: function(scope, element, attrs) {
				Alert.success({
					message: 'Hola directive'
				});
			}
		};
	}])

	.run(function($templateCache) {
		$templateCache.put('alertProvider.html',
			['',
			'<div class="alert alert-{{ type }} alert-dismissible" role="alert">',
			'	<button type="button" class="close" data-dismiss="alert" aria-label="Close">',
			'		<span aria-hidden="true">&times;</span></button>',
			'	<strong ng-show="title">{{ title }}</strong> <span ng-bind-html="message"></span>',
			'</div>'].join('')
    );
  });
