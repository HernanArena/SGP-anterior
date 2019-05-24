//

ContactosService.$inject = ['$resource', '$cookies', 'URL_API'];

function ContactosService($resource, $cookies, URL_API) {
	var info = {},
			headers = { 'x-access-token': $cookies.get('token') };

	info = $resource(URL_API+'/api/user/contacto', {},
			{
				get: {
					method: 'GET',
					isArray: true,
					headers: headers
				},
				post: {
					method: 'POST',
					isArray: true,
					headers: headers
				}
			}
		);

	return info;
}
