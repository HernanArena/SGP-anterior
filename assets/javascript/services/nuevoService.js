//

NuevoService.$inject = ['$resource', '$cookies', 'URL_API'];

function NuevoService($resource, $cookies, URL_API, $params) {
	var info = {},
			headers = { 'content-type':'application/json; charset=utf-8', 'x-access-token': $cookies.get('token') };
			// headers = { 'x-access-token': $cookies.get('token') };

	info.versiones = $resource(URL_API+'/api/sistema/versiones', {},
		{
			get: {
				method: 'GET',
				isArray: true,
				headers: headers
			}
		}
	);

	info.contactos = $resource(URL_API+'/api/user/contacto', {},
		{
			get: {
				method: 'GET',
				isArray: true,
				headers: headers
			}
		}
	);

	info.save = $resource(URL_API+'/api/partes', {},
			{
				post: {
					method: 'POST',
					isArray: true,
					headers: headers
				}
			}
		);

	return info;
}
