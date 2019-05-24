//

PartesService.$inject = ['$resource', '$cookies', 'URL_API'];

function PartesService($resource, $cookies, URL_API) {
	var headers = { 'content-type':'application/json; charset=utf-8', 'x-access-token': $cookies.get('token') };
	return $resource(URL_API+'/api/partes',
		{
			// params
		},
		{
			get: {
				url: URL_API+'/api/partes/todos',
				method: 'GET',
				isArray: true,
				headers: headers
			},
			last: {
				url: URL_API+'/api/partes',
				method: 'GET',
				isArray: true,
				headers: headers
			},
			count: {
				url: URL_API+'/api/partes/count',
				method: 'GET',
				isArray: true,
				headers: headers
			},
			state: {
				url: URL_API+'/api/partes/estados',
				method: 'GET',
				isArray: true,
				headers: headers
			}
		}
	);
}
