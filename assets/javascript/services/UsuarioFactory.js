//

UsuarioFactory.$inject = ['$resource', '$cookies', 'URL_API'];

function UsuarioFactory($resource, $cookies, URL_API) {
	var user = {};

	user.login = $resource('/acceder', {},
			{
				post: {
					method: 'POST',
					isArray: false
				}
			}
		);

	user.reset = function($uid) {
		return $resource(URL_API+'/api/user/resetpw', {},
			{
				get: {
					method: 'GET',
					// isArray: false
					data:false,
					headers: {
						uid: $uid
					}
				}
			}
		);
	};

	user.logo = $resource('http://softland.com.ar/logo.php', {},
			{
				get: {
					method: 'GET',
					isArray: false
				}
			}
		);

	user.set = function (obj) {
		$cookies.put('token', obj.token);
		$cookies.put('username', obj.username);
		$cookies.put('actions', obj.actions.join(','));
		$cookies.put('empresa_name', obj.empresa.name);
		$cookies.put('empresa_logo', obj.empresa.logo);
		$cookies.put('lastLogin', (obj.lastLogin ? obj.lastLogin : null));
		$resource('/logged/:user', { user: obj.username },
			{
				save: {
					method: 'POST',
					data: false,
				}
			}
		).$promise
		.success(function(response) {
			console.log(response);
		});

		// user.data = {
		// 	username: obj.username,
		// 	empresa: obj.empresa,
		// 	actions: obj.actions,
		// 	lastLogin: obj.lastLogin
		// };
	};

	if ($cookies.get('username')) {
		user.username = $cookies.get('username');
		user.empresa = {
				nombre: $cookies.get('empresa_name'),
				logo: $cookies.get('empresa_logo')
			};
		user.actions = $cookies.get('actions').split(',');
		if ($cookies.get('lastLogin')) {
			user.lastLogin = $cookies.get('lastLogin');
		}
	}

	return user;

	// user.getLogo = function () {
	// 	var logo = '';
	// 	if (typeof user.empresa.logo !== 'string') {
	// 		logo = 'assets/images/logo_default.png';
	// 	} else {
	// 		logo = 'http://www.softland.com.ar/wp-content/themes/softland/lib/clientes/core/uploads/'+ user.empresa.logo +'.png';
	// 	}
	// 	return logo;
	// };

	// user.getAvatar = function () {
	// 	return 'assets/images/avatar1.png';
	// };

	// user.getlastLogin = function () {
	// 	// if (isDate(user.lastLogin)) {

	// 	// }
	// 	return user.lastLogin;
	// };

	// function isDate(date) {
	// 	return ( (new Date(date) !== "Invalid Date" && !isNaN(new Date(date)) ));
	// }
}
